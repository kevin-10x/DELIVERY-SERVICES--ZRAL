import { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 0.3,
  lng: 35.3
};

export default function Track() {
  const [location, setLocation] = useState(center);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:5000/rider-location");
        const data = await res.json();
        setLocation(data);
      } catch (err) {
        console.log("Error fetching location");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Track Your Rider</h2>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={14}
        >
          <Marker position={location} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}