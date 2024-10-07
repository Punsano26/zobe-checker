import "./App.css";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import Swal from "sweetalert2";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import axios from "axios";
const base_url = import.meta.env.VITE_API_BASE_URL;
function App() {
  const center = [13.838464587099722, 100.02580994106604]; //computer NPRU
  const [stores, setStores] = useState([]);
  const [mylocation, setMylocation] = useState({ lat: "", lng: "" });
  const [deliveryZone, setDeliveryZone] = useState({
    lat: 13.83231804, //ไรรดา(นครปฐม)
    lng: 100.04105221,
    radius: 1000,
  });

  // function to calculate distance between 2 point using Haversine Formular
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

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(base_url + "/api/stores");
        console.log(response.data);
        if (response.status === 200) {
          setStores(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStore();
  }, []);

  const LocationMap = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        console.log("lat" + lat, "long" + lng);
        setMylocation({ lat, lng });
      },
    });
    return (
      <Marker position={[mylocation.lat, mylocation.lng]}>
        <Popup>My Current Location</Popup>
      </Marker>
    );
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setMylocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const handleStoreClick = (store) => {
    setDeliveryZone({
      lat: store.lat,
      lng: store.lng,
      radius: store.radius,
    });
  };


  const handleLocationCheck = () => {
    if (deliveryZone.lat === "" || deliveryZone.lng === "") {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Plase select your valid Store Location",
        confirmButtonText: "OK",
        timer: 3000,
      });
      return;
    }
    if (mylocation.lat === "" || mylocation.lng === "") {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Plase select your valid Location",
        confirmButtonText: "OK",
        timer: 3000,
      });
      return;
    }

    const distance = calculateDistance(
      deliveryZone.lat,
      deliveryZone.lng,
      mylocation.lat,
      mylocation.lng
    );
    if (distance <= deliveryZone.radius) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "success",
        text: "you are within the delivery zone",
        confirmButtonText: "OK",
        timer: 3000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "error!",
        text: "you are outside the delivery zone",
        confirmButtonText: "OK",
        timer: 3000,
      });
    }

  console.log("Distance:", distance); // เพิ่ม log เพื่อดูค่า distance
  console.log("Delivery Zone Radius:", deliveryZone.radius);
  };
  return (
    <div>
      <h1>Store Delivery Zone Checker</h1>
      <button onClick={handleGetLocation}>Get My Location</button>
      <button onClick={handleLocationCheck}>Check Delivery Availability</button>
      <div className="mapContainer">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "75vh", width: "100vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[mylocation.lat, mylocation.lng]}>
            <Popup>My Current Location</Popup>
          </Marker>

          <Marker position={center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {/* Display all stores on map  */}
          {stores &&
            stores.map((store) => {
              return (
                <Marker
                  eventHandlers={{
                    click: () => {
                      handleStoreClick(store);
                    },
                  }}
                  position={[store.lat, store.lng]}
                  key={store.id}
                >
                  <Popup>
                    <b>{store.name}</b>
                    <p>{store.address}</p>
                    <a href={store.direction}>Get Direction</a>
                  </Popup>
                </Marker>
              );
            })}
          {/* เรียกใช้ปักหมุดแมพด้านล่าง */}
          <LocationMap />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
