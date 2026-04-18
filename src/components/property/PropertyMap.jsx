import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'

export default function PropertyMap({ properties, center, zoom = 11 }) {
  const mapCenter = center ?? (
    properties.length
      ? [properties[0].lat, properties[0].lng]
      : [39.5, -98.35]
  )

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      className="w-full h-full rounded-2xl z-0"
      style={{ minHeight: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map(p => (
        <Marker key={p.id} position={[p.lat, p.lng]}>
          <Popup>
            <div className="text-sm min-w-[180px]">
              <p className="font-bold">${p.price.toLocaleString()}</p>
              <p className="text-gray-600 text-xs">{p.title}</p>
              <Link to={`/listings/${p.id}`} className="text-primary-600 text-xs font-medium hover:underline">
                View details →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
