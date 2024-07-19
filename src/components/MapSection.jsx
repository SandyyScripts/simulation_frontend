import { useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import RideRoutes from "./RideRoutes";

const mapboxToken = import.meta.env.VITE_MAPBOX_KEY;
const fetchRideSimulatorData = async (passengers, rides) => {
  const response = await axios.post(
    "https://simulationapi-server.vercel.app/api/ride_simulator/",
    {
      passengers,
      rides,
    }
  );
  return response.data;
};

function MapSection({ passengers, rides, simulateNow, setSimulateNow }) {
  const [completeData, setCompleteData] = useState({});
  const [passengerDetails, setPassengerDetails] = useState({});
  const [rideDetails, setRideDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (passengers > 0 && rides > 0 && simulateNow) {
      fetchRideSimulatorData(passengers, rides)
        .then((data) => {
          setCompleteData(data);
          setPassengerDetails(data?.passengers);
          setRideDetails(data?.ride_coordinates);
        })
        .catch((error) => setError(error));
    }
  }, [passengers, rides, simulateNow]);

  if (error) return <div>Error loading data...</div>;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          longitude: 77.5946,
          latitude: 12.9716,
          zoom: 11,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {Object.keys(passengerDetails)?.length > 0 &&
          Object.keys(passengerDetails)?.map((position, index) => (
            <>
              <Marker
                key={`source-${index}`}
                longitude={passengerDetails[position].source.longitude}
                latitude={passengerDetails[position].source.latitude}
                color={passengerDetails[position].color}
              />
              <Marker
                key={`destination-${index}`}
                longitude={passengerDetails[position].destination.longitude}
                latitude={passengerDetails[position].destination.latitude}
                color={passengerDetails[position].color}
              />
            </>
          ))}
        {Object.keys(rideDetails)?.length > 0 &&
          Object.keys(passengerDetails)?.length > 0 &&
          simulateNow && (
            <RideRoutes
              completeData={completeData}
              setSimulateNow={setSimulateNow}
              rideDetails={rideDetails}
            />
          )}
      </Map>
    </div>
  );
}

export default MapSection;
