/* eslint-disable react/prop-types */
import { Layer, Source } from "react-map-gl";
import { Marker } from "react-map-gl";

export default function MapBoxRoute(props) {
  const { coordinates, color } = props;

  // eslint-disable-next-line react/prop-types
  if (!coordinates || !coordinates.length) {
    return null; // Don't render if coordinates are not valid
  }

  return (
    <>
      <Source
        type="geojson"
        data={{
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        }}
      >
        <Layer
          type="line"
          layout={{ "line-join": "round", "line-cap": "round" }}
          paint={{ "line-color": color, "line-width": 4 }}
        />
      </Source>
      <Marker longitude={coordinates[0][0]} latitude={coordinates[0][1]}>
        <img
          src="https://images.vexels.com/media/users/3/128871/isolated/lists/45de5ba24afaf2c714231ca6e1b1a28a-taxi-travel-round-icon.png"
          alt="Car Icon"
          style={{ width: "30px", height: "30px" }}
        />
      </Marker>
    </>
  );
}
