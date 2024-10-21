import { Marker, Popup, useMap } from "react-leaflet";
import StoreCircle from "./StoreCircle";

const StoreMarker = ({ store, setDeliveryZone }) => {
  const map = useMap();

  const handleStoreClick = () => {
    setDeliveryZone({
      lat: store.lat,
      lng: store.lng,
      radius: store.radius,
    });
    StoreCircle(store.lat, store.lng, store.radius, map);
  };

  return (
    <Marker
      position={[store.lat, store.lng]}
      eventHandlers={{ click: handleStoreClick }}
    >
      <Popup>
        <b>{store.name}</b>
        <p>{store.address}</p>
        <a href={store.direction} target="_blank" rel="noopener noreferrer">
          Get Direction
        </a>
      </Popup>
    </Marker>
  );
};

export default StoreMarker;
