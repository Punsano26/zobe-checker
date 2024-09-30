import "./App.css";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css"
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
const [mylocation, setMylocation] = useState({lat:"", lng:""});
  useEffect(()=>{
    const fetchStore = async ()=> {
      try {
        const response = await axios.get(base_url + "/api/stores");
        console.log(response.data);
        if(response.status === 200) {
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
    click() {
     const {lat, lng} = e.latlng;
     console.log("lat"+lat, "long"+lng);
     setMylocation({lat, lng});
    },
  });
  return (
    <Marker position={[mylocation.lat, mylocation.lng]}>
      <Popup>My Current Location</Popup>
    </Marker>
  );
  };

  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=> {
      setMylocation({
        lat:position.coords.latitude,
        lng:position.coords.longitude
      })
    })
  }

  
  return (
    <div>
      <h1>Store Delivery Zone Checker</h1>
      <button onClick={handleGetLocation}>Get My Location</button>
      <div className="mapContainer">
        <MapContainer
          center={center}
          zoom={13}
          style={{height:"75vh", width:"100vh"}}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
              position={[mylocation.lat, mylocation.lng]}>
            <Popup>My Current Location</Popup>
          </Marker>

          <Marker position={center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
            {/* Display all stores on map  */}
            {stores && 
              stores.map((store)=>{
              return (
                <Marker position={[store.lat, store.lng]} key={store.id}>
                  <Popup>
                    <b>{store.name}</b>
                    <p>{store.address}</p>
                    <a href={store.direction}>Get Direction</a>
                  </Popup>
                </Marker>
              )
            })}
            {/* เรียกใช้ปักหมุดแมพด้านล่าง */}
            <LocationMap />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
