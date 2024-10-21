
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";
import { MapContainer, TileLayer } from "react-leaflet";
import axios from "axios";
import StoresService from "../services/store.service";
import LocationMap from "../component/LocationMap";
import StoreMarker from "../component/StoreMarker";
const base_url = import.meta.env.VITE_API_BASE_URL;

function Home() {
  const center = [13.838464587099722, 100.02580994106604]; // Computer NPRU
  const [stores, setStores] = useState([]);
  const [mylocation, setMylocation] = useState({ lat: "", lng: "" });
  const [deliveryZone, setDeliveryZone] = useState({
    lat: 13.83231804,
    lng: 100.04105221,
    radius: 1000,
  });

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await StoresService.getAllStores();
        if (response.status === 200) setStores(response.data);
        console.log("API Response:", response.data); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchStore();
  }, []);

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMylocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const handleLocationCheck = () => {
    if (deliveryZone.lat === "" || deliveryZone.lng === "") {
      return Swal.fire({
        icon: "error",
        title: "Please select a valid Store Location",
        confirmButtonText: "OK",
        timer: 3000,
      });
    }
    if (mylocation.lat === "" || mylocation.lng === "") {
      return Swal.fire({
        icon: "error",
        title: "Please select a valid Location",
        confirmButtonText: "OK",
        timer: 3000,
      });
    }

    const distance = calculateDistance(
      deliveryZone.lat,
      deliveryZone.lng,
      mylocation.lat,
      mylocation.lng
    );

    if (distance <= deliveryZone.radius) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "You are within the delivery zone",
        confirmButtonText: "OK",
        timer: 3000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "You are outside the delivery zone",
        confirmButtonText: "OK",
        timer: 3000,
      });
    }
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371e3; //Eath radius in meters
    const phi_1 = (lat1 * Math.PI) / 180;
    const phi_2 = (lat2 * Math.PI) / 180;

    const delta_phi = ((lat2 - lat1) * Math.PI) / 180;
    const delta_lambda = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
      Math.cos(phi_1) *
        Math.cos(phi_2) *
        Math.sin(delta_lambda / 2) *
        Math.sin(delta_lambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; //Distance in meters
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold py-4">Store Delivery Zone Checker</h1>
      <button className="btn btn-primary mb-2" onClick={handleGetLocation}>Get My Location</button>
      <button className="btn btn-accent ml-2 mb-2" onClick={handleLocationCheck}>Check Delivery Availability</button>
      <div className="mapContainer">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "75vh", width: "100vw" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stores.map((store) => (
            <StoreMarker
              key={store.id}
              store={store}
              setDeliveryZone={setDeliveryZone}
            />
          ))}
          <LocationMap mylocation={mylocation} setMylocation={setMylocation} />
        </MapContainer>
      </div>
    </div>
  );
}

export default Home;
