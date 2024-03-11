// MapComponent.js
import React, { useEffect } from "react";
import { loadModules } from "esri-loader";

const MapComponent = () => {
  useEffect(() => {
    loadModules(["esri/Map", "esri/views/MapView", "esri/Graphic"])
      .then(([Map, MapView, Graphic]) => {
        const map = new Map({
          basemap: "streets",
        });

        // Create your custom graphics layer
        const customLayer = new CustomLayer({
          graphics: [
            new Graphic({
              geometry: { type: "point", x: 0, y: 0 },
              symbol: { type: "simple-marker", color: "red" },
            }),
            // Add more graphics as needed
          ],
        });

        map.add(customLayer);

        const view = new MapView({
          container: "mapViewDiv",
          map,
          center: [0, 0],
          zoom: 3,
        });
      })
      .catch((err) => console.error(err));
  }, []); // Run only once on component mount

  return <div id="mapViewDiv" style={{ height: "100vh", width: "100%" }}></div>;
};

export default MapComponent;
