import { Marker, Popup, useMapEvents } from "react-leaflet";

const LocationMap = ({ mylocation, setMylocation }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMylocation({ lat, lng });
    },
  });

  return (
    <Marker position={[mylocation.lat, mylocation.lng]}>
      <Popup>My Current Location</Popup>
    </Marker>
  );
};

export default LocationMap;
