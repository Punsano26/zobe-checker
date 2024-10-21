import L from "leaflet";

const StoreCircle = (lat, lng, radius, map) => {
  L.circle([lat, lng], {
    color: "red",
    fillColor: "#f03",
    fillOpacity: 0.5,
    radius: radius,
  }).addTo(map);
};

export default StoreCircle;