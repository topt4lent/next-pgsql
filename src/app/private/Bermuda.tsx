import { useState, useEffect } from "react";
import { loadModules } from "esri-loader";

const BermudaTriangle = (props: any) => {
  const [graphic, setGraphic] = useState(null);
  useEffect(() => {
    loadModules(["esri/Graphic"])
      .then(([Graphic]) => {
        // Create a polygon geometry
        const polygon = {
          type: "polygon", // autocasts as new Polygon()
          rings: [
            [100.56389828684051, 13.886527691175036],
            [100.56701501337291, 13.884887281363241],
            [100.56447227950653, 13.887334872693131],
            [100.56799133734694, 13.886324593447124],
          ],
        };

        // Create a symbol for rendering the graphic
        const fillSymbol = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [227, 139, 79, 0.8],
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 1,
          },
        };

        // Add the geometry and symbol to a new graphic
        const graphic = new Graphic({
          geometry: polygon,
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

export default BermudaTriangle;
