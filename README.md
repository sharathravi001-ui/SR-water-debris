# Shoreline Debris Hotspot Finder
This is a google earth engine app to find debris or waste hotspot in waterbodies

# 🌊 Shoreline Debris Hotspot Finder

An interactive web app built with **Google Earth Engine** and hosted on **GitHub Pages**.  
It lets anyone draw an area of interest (AOI), run a simple satellite analysis, and download **red dot hotspot points** as CSV or KML.

🔗 **Live App:** [Click here to open](https://sharathravi001.users.earthengine.app/view/shoreline-debris-hotspot-finder)  
🌐 **Public Webpage:** (GitHub Pages link once you deploy)

---

## 🚀 Features
- Draw your own AOI directly on the map (rectangle or polygon).
- Adjust **Cloud %**, **Threshold**, and **Shoreline distance** filters.
- Detect potential debris / floating waste hotspots as **red dots**.
- **Download results** as:
  - CSV (lat/lon coordinates)
  - KML (Google Earth / Maps compatible)
- Runs fully in the browser — no coding or logins needed.

---

## 📖 How to Use
1. **Open the app** (link above or on the hosted page).
2. Draw a box or polygon over your area of interest.
3. Adjust sliders:
   - **Cloud filter %**: remove cloudy images.
   - **Threshold**: higher = stricter (fewer hotspots).
   - **Shoreline distance**: buffer in meters around the shore.
4. Click **RUN** to process and see red hotspot points.
5. Click **Generate downloads** to export results:
   - **CSV** for spreadsheets or GIS tools.
   - **KML** for Google Earth / Maps.

---

## 📷 Screenshots

---<img width="1918" height="899" alt="hotspot marker" src="https://github.com/user-attachments/assets/f76bc54a-ab22-4da5-b694-29a4afafc5c0" />


## 🛠️ Tech Stack
- **Google Earth Engine** (satellite analysis + app logic)
- **JavaScript EE API** for map + UI
- **GitHub Pages** for hosting a simple landing page
- **HTML/CSS** for a clean wrapper site


---

## 🌍 Deployment
This site is hosted using **GitHub Pages**:

1. Push `index.html` and `README.md` to your repo.
2. In repo settings → **Pages** → set source to `main` branch `/root`.
3. Your site will be available at:  
   `https://<your-username>.github.io/`

---

## ⚠️ Notes & Limitations
- This tool shows **candidate hotspots**. Some false positives (e.g., algae, foam, shallow water) are possible.
- Very large AOIs may produce too many points for browser downloads — reduce AOI size or increase threshold.
- Users cannot export directly to Google Drive; downloads happen locally in CSV/KML.

---

## 📜 License
MIT License — feel free to use, modify, and share. Attribution appreciated.

---

## 🙌 Acknowledgements
- [Google Earth Engine](https://earthengine.google.com/) for free satellite data & cloud processing.  
- Community open-source inspiration for mapping waste & debris.  



