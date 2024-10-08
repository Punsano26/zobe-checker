import { useMapEvents, Marker, Popup } from "react-leaflet";
import iconMyLocation from "../assets/map.png";

const LocationMap = ({ mylocation, setMylocation }) => {
  const myLocationicon = L.icon({
    iconUrl: iconMyLocation,
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [0, -10],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      console.log("lat" + lat, "long" + lng);
      setMylocation({ lat, lng });
    },
  });
  return (
    <Marker icon={myLocationicon} position={[mylocation.lat, mylocation.lng]}>
      <Popup>My Current Location</Popup>
    </Marker>
  );
};

export default LocationMap;
