import { rapidGet } from './rapidApiClient'

// ─── Hosts ────────────────────────────────────────────────────────────────────
const US_HOST = 'realty-in-us.p.rapidapi.com'
const CA_HOST = 'canadian-real-estate-listings.p.rapidapi.com'

// US state abbreviations for the 6 US cities we support
const US_STATES = ['TX', 'CO', 'TN', 'NC', 'AZ', 'FL']
// Canadian province abbreviations
const CA_PROVINCES = ['ON', 'BC', 'AB', 'QC']

// ─── Normalise a US listing (Realtor.com API) → our property shape ─────────────
function adaptUSProperty(raw) {
  const loc = raw.location?.address ?? {}
  const desc = raw.description ?? {}
  const photo = raw.primary_photo?.href ?? raw.photos?.[0]?.href ?? ''
  const photos = (raw.photos ?? []).map(p => p.href).filter(Boolean)
  if (photo && !photos.includes(photo)) photos.unshift(photo)

  const listingType =
    desc.year_built && new Date().getFullYear() - desc.year_built <= 2
      ? 'New Construction'
      : 'Resale'

  return {
    id: `us-${raw.property_id ?? raw.listing_id}`,
    slug: raw.listing_id ?? raw.property_id,
    title: desc.name ?? `${desc.type ?? 'Home'} at ${loc.line ?? ''}`,
    address: loc.line ?? '',
    city: loc.city ?? '',
    state: loc.state_code ?? '',
    country: 'US',
    zip: loc.postal_code ?? '',
    lat: raw.location?.coordinate?.lat ?? 0,
    lng: raw.location?.coordinate?.lon ?? 0,
    price: raw.list_price ?? raw.price ?? 0,
    currency: 'USD',
    beds: desc.beds ?? desc.beds_min ?? 0,
    baths: desc.baths_consolidated ?? desc.baths ?? desc.baths_min ?? 0,
    sqft: desc.sqft ?? desc.sqft_min ?? 0,
    garages: desc.garage ?? 0,
    type: mapPropertyType(desc.type),
    listingType,
    status: raw.status === 'for_sale' ? 'Active' : raw.status ?? 'Active',
    builderId: null,
    mlsNumber: raw.mls?.id ?? null,
    description: raw.description?.text ?? '',
    features: raw.tags ?? [],
    images: photos.length ? photos : ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80'],
    completionDate: listingType === 'New Construction' ? 'Move-In Ready' : null,
    yearBuilt: desc.year_built ?? null,
    featured: false,
    _source: 'api',
  }
}

// ─── Normalise a Canadian listing → our property shape ───────────────────────
function adaptCAProperty(raw) {
  // The Canadian Real Estate Listings API on RapidAPI returns this structure
  const addr = raw.Address ?? raw.address ?? {}
  const province = raw.Province ?? raw.province ?? addr.Province ?? addr.province ?? ''
  const city = raw.City ?? raw.city ?? addr.City ?? addr.city ?? ''

  const price = Number(raw.Price ?? raw.price ?? raw.ListPrice ?? 0)
  const beds = Number(raw.Bedrooms ?? raw.bedrooms ?? raw.BedroomsTotal ?? 0)
  const baths = Number(raw.Bathrooms ?? raw.bathrooms ?? raw.BathroomsTotal ?? 0)
  const sqft = Number(raw.SqFt ?? raw.sqft ?? raw.BuildingAreaTotal ?? 0)

  const rawPhotos = raw.Photos ?? raw.photos ?? []
  const images = Array.isArray(rawPhotos) && rawPhotos.length
    ? rawPhotos.slice(0, 5).map(p => (typeof p === 'string' ? p : p.uri ?? p.Uri ?? p.href ?? ''))
        .filter(Boolean)
    : ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80']

  const yearBuilt = Number(raw.YearBuilt ?? raw.yearBuilt ?? 0) || null
  const listingType =
    yearBuilt && new Date().getFullYear() - yearBuilt <= 2
      ? 'New Construction'
      : 'Resale'

  return {
    id: `ca-${raw.Id ?? raw.id ?? raw.ListingId ?? raw.MlsNumber ?? Math.random()}`,
    slug: raw.MlsNumber ?? raw.mlsNumber ?? raw.Id ?? '',
    title: raw.Title ?? raw.title ?? `${mapPropertyType(raw.Type ?? raw.type)} in ${city}`,
    address: raw.UnparsedAddress ?? addr.UnparsedAddress ?? `${addr.StreetNumber ?? ''} ${addr.StreetName ?? ''}`.trim(),
    city,
    state: province,
    country: 'CA',
    zip: raw.PostalCode ?? addr.PostalCode ?? '',
    lat: Number(raw.Latitude ?? raw.latitude ?? raw.Location?.Latitude ?? 0),
    lng: Number(raw.Longitude ?? raw.longitude ?? raw.Location?.Longitude ?? 0),
    price,
    currency: 'CAD',
    beds,
    baths,
    sqft,
    garages: Number(raw.ParkingSpaces ?? raw.parkingSpaces ?? 0),
    type: mapPropertyType(raw.Type ?? raw.type ?? raw.PropertyType),
    listingType,
    status: 'Active',
    builderId: null,
    mlsNumber: raw.MlsNumber ?? raw.mlsNumber ?? raw.MLS ?? null,
    description: raw.PublicRemarks ?? raw.remarks ?? raw.Description ?? '',
    features: parseFeatures(raw.Features ?? raw.features),
    images,
    completionDate: listingType === 'New Construction' ? 'Move-In Ready' : null,
    yearBuilt,
    featured: false,
    _source: 'api',
  }
}

function mapPropertyType(raw = '') {
  const t = String(raw).toLowerCase()
  if (t.includes('condo') || t.includes('apartment') || t.includes('apt')) return 'Condo'
  if (t.includes('town') || t.includes('row')) return 'Townhouse'
  return 'Single Family'
}

function parseFeatures(raw) {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean).slice(0, 10)
  if (typeof raw === 'string') return raw.split(',').map(s => s.trim()).filter(Boolean).slice(0, 10)
  return []
}

// ─── Public API functions ─────────────────────────────────────────────────────

/**
 * Search US listings (Realtor.com via RapidAPI).
 * Docs: realty-in-us.p.rapidapi.com → /properties/v3/list
 */
export async function searchUSProperties({ city, state, priceMin, priceMax, beds, baths, type, listingType, limit = 24 }) {
  const params = {
    city,
    state_code: state,
    list_price_min: priceMin > 0 ? priceMin : undefined,
    list_price_max: priceMax < 2000000 ? priceMax : undefined,
    beds_min: beds || undefined,
    baths_min: baths || undefined,
    prop_type: mapTypeToApiParam(type),
    // status_type: listingType === 'New Construction' ? 'new_construction' : undefined,
    limit,
    offset: 0,
    sort: 'list_date_desc',
  }

  const data = await rapidGet(US_HOST, '/properties/v3/list', params)
  const results = data?.data?.home_search?.results ?? data?.results ?? data?.listings ?? []
  return results.map(adaptUSProperty).filter(p => p.price > 0)
}

/**
 * Fetch a single US property by ID.
 */
export async function getUSPropertyDetail(propertyId) {
  const cleanId = propertyId.replace(/^us-/, '')
  const data = await rapidGet(US_HOST, '/properties/v3/detail', { property_id: cleanId })
  const raw = data?.data?.home?.results?.[0] ?? data?.results?.[0] ?? null
  if (!raw) return null
  return adaptUSProperty(raw)
}

/**
 * Search Canadian listings via RapidAPI.
 * Subscribe at: https://rapidapi.com/latchaw/api/canadian-real-estate-listings
 * (search "Canadian Real Estate" on RapidAPI if that link changes)
 */
export async function searchCAProperties({ city, province, priceMin, priceMax, beds, limit = 20 }) {
  const params = {
    city,
    province,
    minPrice: priceMin > 0 ? priceMin : undefined,
    maxPrice: priceMax < 5000000 ? priceMax : undefined,
    minBeds: beds || undefined,
    limit,
  }

  const data = await rapidGet(CA_HOST, '/listings', params)
  // Different APIs wrap differently — try common shapes
  const results =
    data?.Results ?? data?.results ?? data?.data ?? data?.listings ?? data ?? []
  const arr = Array.isArray(results) ? results : Object.values(results)
  return arr.map(adaptCAProperty).filter(p => p.price > 0)
}

/**
 * Fetch a single Canadian property by MLS number.
 */
export async function getCAPropertyDetail(mlsOrId) {
  const cleanId = mlsOrId.replace(/^ca-/, '')
  const data = await rapidGet(CA_HOST, '/listing', { id: cleanId })
  const raw = data?.Result ?? data?.result ?? data?.data ?? data ?? null
  if (!raw || typeof raw !== 'object') return null
  return adaptCAProperty(raw)
}

function mapTypeToApiParam(type) {
  if (!type) return undefined
  if (type === 'Condo') return 'condos'
  if (type === 'Townhouse') return 'townhomes'
  if (type === 'Single Family') return 'single_family'
  return undefined
}

// Helper: is a city in our Canadian set?
export function isCaCity(cityName) {
  return ['Toronto', 'Vancouver', 'Calgary', 'Montreal', 'Ottawa', 'Edmonton'].includes(cityName)
}

// Helper: get province for a CA city
export function cityToProvince(cityName) {
  const map = { Toronto: 'ON', Ottawa: 'ON', Vancouver: 'BC', Calgary: 'AB', Edmonton: 'AB', Montreal: 'QC' }
  return map[cityName] ?? ''
}
