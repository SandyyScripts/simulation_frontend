import { useEffect, useState } from "react";
import axios from "axios";
import MapBoxRoute from "./MapBoxRoute";
const fetchRouteData = async (travelData) => {
  const response = await axios.post(
    "https://simulationapi-server.vercel.app/api/ride_assignment/",

    travelData
  );
  return response.data;
};
function RideRoutes({ completeData, setSimulateNow, rideDetails }) {
  const [routes, setRoutes] = useState([]);
  const [animatedRoutes, setAnimatedRoutes] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const [idleAvailable, setIdleAvailable] = useState([]);
  useEffect(() => {
    if (Object.keys(completeData).length > 0) {
      fetchRouteData(completeData)
        .then((data) => {
          setRoutes((prevRoutes) => {
            const newRoutes = Object.values(data?.assigned_routes || []);
            const updatedRoutes = [...prevRoutes];

            newRoutes.forEach((newRoute) => {
              const alreadyExists = updatedRoutes.some(
                (route) =>
                  route.passenger_name === newRoute.passenger_name &&
                  route.ride_name === newRoute.ride_name
              );

              if (!alreadyExists) {
                updatedRoutes.push(newRoute);
              }
            });

            return updatedRoutes;
          });
          console.log(data, "~");
          if (data?.idle_passengers.length > 0) {
            setIdleAvailable(data?.idle_passengers);
          } else if (data?.idle_rides?.length > 0) {
            setIdleAvailable(data?.idle_rides);
          }

          setIsAnimating(true);
        })
        .catch((error) => console.log(error));
    }
  }, [completeData]);

  useEffect(() => {
    if (!isAnimating) {
      return;
    }
    const animateRoutes = () => {
      setRoutes((prevRoutes) => {
        const updatedRoutes = prevRoutes.map((route) => {
          let updatedRideToPassengerRoute = Array.isArray(
            route?.ride_to_passenger_route?.routes
          )
            ? route.ride_to_passenger_route.routes
            : [];

          let updatedPassengerSourceToDestination = Array.isArray(
            route?.ride_passenger_source_to_destination?.routes
          )
            ? route.ride_passenger_source_to_destination.routes
            : [];

          if (
            updatedRideToPassengerRoute.length > 0 &&
            updatedRideToPassengerRoute[0]?.geometry?.coordinates?.length > 0
          ) {
            updatedRideToPassengerRoute[0].geometry.coordinates =
              updatedRideToPassengerRoute[0].geometry.coordinates.slice(10);
          } else if (
            updatedPassengerSourceToDestination.length > 0 &&
            updatedPassengerSourceToDestination[0]?.geometry?.coordinates
              ?.length > 0
          ) {
            updatedPassengerSourceToDestination[0].geometry.coordinates =
              updatedPassengerSourceToDestination[0].geometry.coordinates.slice(
                10
              );
          }

          setAnimatedRoutes((prevAnimatedRoutes) => {
            const index = prevAnimatedRoutes.findIndex(
              (r) =>
                r.passenger_name === route.passenger_name &&
                r.ride_name === route.ride_name
            );
            const a =
              updatedPassengerSourceToDestination[0]?.geometry?.coordinates;

            const b = updatedRideToPassengerRoute[0]?.geometry?.coordinates;

            if (index !== -1) {
              // Update existing route
              const updatedRoutes = [...prevAnimatedRoutes];
              updatedRoutes[index] = {
                passenger_name: route.passenger_name,
                ride_name: route.ride_name,
                current_route: [...b, ...a],
                color: route.route_color,
              };
              return updatedRoutes;
            } else {
              // Add new route
              return [
                ...prevAnimatedRoutes,
                {
                  passenger_name: route.passenger_name,
                  ride_name: route.ride_name,
                  current_route: [...b, ...a],
                  color: route.route_color,
                },
              ];
            }
          });

          return {
            ...route,
            ride_passenger_source_to_destination: {
              ...route.ride_passenger_source_to_destination,
              routes: updatedPassengerSourceToDestination,
            },
            ride_to_passenger_route: {
              ...route.ride_to_passenger_route,
              routes: updatedRideToPassengerRoute,
            },
          };
        });

        const nonEmptyRoutes = updatedRoutes.filter(
          (route) =>
            route?.ride_to_passenger_route?.routes[0]?.geometry?.coordinates
              ?.length > 0 ||
            route?.ride_passenger_source_to_destination?.routes[0]?.geometry
              ?.coordinates?.length > 0
        );

        if (nonEmptyRoutes.length === 0) {
          setIsAnimating(false);
          setSimulateNow(false);
        }

        return nonEmptyRoutes;
      });
    };

    const intervalId = setInterval(animateRoutes, 1000); // 1000 ms = 1 second

    return () => clearInterval(intervalId);
  }, [isAnimating, routes]);

  return (
    <>
      {animatedRoutes?.map((route, index) => (
        <MapBoxRoute
          key={index}
          coordinates={route?.current_route}
          color={route?.color}
        />
      ))}
    </>
  );
}

export default RideRoutes;
