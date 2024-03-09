import { useState, useEffect } from "react";
import { loadModules } from "esri-loader";

const PointMark = (props: any) => {
  const [graphic, setGraphic] = useState(null);
  useEffect(() => {
    loadModules(["esri/Graphic"])
      .then(([Graphic]) => {
        // Create a polygon geometry
        const point = {
          type: "point",
          longitude: 100.56470831387388,
          latitude: 13.886236063612623,
        };

        // Create a symbol for rendering the graphic
        const fillSymbol = {
          type: "simple-marker",
          color: "red",
          width: 2, // Orange
          outline: {
            color: "blue", // White
            width: 5,
          },
        };

        // Add the geometry and symbol to a new graphic
        const graphic = new Graphic({
          geometry: point,
          symbol: fillSymbol,
        });
        setGraphic(graphic);
        props.view.graphics.add(graphic);
      })
      .catch((err) => console.error(err));

    return function cleanup() {
      props.view.graphics.remove(graphic);
    };
  }, []);

  return null;
};

export default PointMark;
