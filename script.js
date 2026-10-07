(() => {
  const locations = window.aquiferLocations;
  if (!Array.isArray(locations) || locations.length === 0) {
    throw new Error("Aquifer map locations could not be loaded.");
  }

  const map = L.map("map", {
    scrollWheelZoom: false
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);

  const markerIcon = L.divIcon({
    className: "aquifer-map-icon",
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="44" viewBox="0 0 34 44" aria-hidden="true">
        <path fill="#0879bd" stroke="#fff" stroke-width="2" d="M17 1C8.2 1 1 8.1 1 16.7 1 28.4 17 43 17 43s16-14.6 16-26.3C33 8.1 25.8 1 17 1Z"/>
        <path fill="#fff" d="M9 13h2V9h5V7h2v2h4a3 3 0 0 1 3 3v3h-2v-3a1 1 0 0 0-1-1h-6v4h-2v-2h-3v5h9v3h-2v-1h-9v-7h-2v-3Zm11 5h3v3h-3z"/>
        <path fill="#fff" d="M21.5 22.5c0 1.2-.9 2.1-2 2.1s-2-.9-2-2.1c0-1 2-3 2-3s2 2 2 3Z"/>
      </svg>`,
    iconSize: [34, 44],
    iconAnchor: [17, 43],
    popupAnchor: [0, -40]
  });

  function cleanDescription(html) {
    const template = document.createElement("template");
    template.innerHTML = html;

    template.content.querySelectorAll("script, style, iframe, object, embed, form, svg, math").forEach((element) => {
      element.remove();
    });

    const allowedTags = new Set(["B", "BR", "DIV", "EM", "I", "IMG", "LI", "OL", "P", "SPAN", "STRONG", "UL"]);
    template.content.querySelectorAll("*").forEach((element) => {
      if (!allowedTags.has(element.tagName)) {
        element.replaceWith(...element.childNodes);
        return;
      }

      const imageSource = element.tagName === "IMG" ? element.getAttribute("src") : null;
      const imageAlt = element.tagName === "IMG" ? element.getAttribute("alt") : null;
      [...element.attributes].forEach((attribute) => element.removeAttribute(attribute.name));

      if (element.tagName === "IMG") {
        try {
          const imageUrl = new URL(imageSource);
          if (imageUrl.protocol !== "https:" || imageUrl.hostname !== "mymaps.usercontent.google.com") {
            element.remove();
            return;
          }
          element.src = imageUrl.href;
          element.alt = imageAlt || "Aquifer location";
          element.loading = "lazy";
        } catch {
          element.remove();
        }
      }
    });

    return template.content;
  }

  const markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom: 18,
    spiderfyOnMaxZoom: true
  });

  locations.forEach((location) => {
    if (
      typeof location.name !== "string" ||
      typeof location.description !== "string" ||
      !Number.isFinite(location.lat) ||
      !Number.isFinite(location.lon)
    ) {
      throw new Error("Aquifer map contains an invalid location.");
    }

    const marker = L.marker([location.lat, location.lon], { icon: markerIcon });
    const popup = document.createElement("article");
    popup.className = "aquifer-popup";

    const title = document.createElement("h2");
    title.textContent = location.name;
    popup.append(title);

    const details = document.createElement("div");
    details.className = "aquifer-popup__details";
    details.append(cleanDescription(location.description));
    popup.append(details);

    marker.bindPopup(popup, { maxWidth: 320 });
    markers.addLayer(marker);
  });

  map.addLayer(markers);
  map.fitBounds(markers.getBounds().pad(0.12), { maxZoom: 15 });
})();