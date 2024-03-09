"use client";
import axios from "axios";
import { loadModules } from "esri-loader";

class CustomPointLayer {
  private graphicsLayer: any; // Use 'any' or a more specific type for your needs

  constructor() {
    this.graphicsLayer = null;
  }

  async fetchData() {
    try {
      // Load required ArcGIS modules dynamically
      const [Graphic, GraphicsLayer] = await loadModules([
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
      ]);

      // Create a new GraphicsLayer for your custom points
      this.graphicsLayer = new GraphicsLayer();

      // Fetch data from your API using Axios
      const response = await axios.get("/api/layer?type=1", {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvcHQ0bGVudCIsIm5hbWUiOiLguJfguYrguK3guJsiLCJpYXQiOjE3MDk5NjkxMzN9.D-M0DxRELXkbbE9Q4-YoY6THWp1VMSzFDph0mgFs90s`,
        },
      });

      // Extract points from the API response
      const pointsWithText = response.data.rows;

      // Create point graphics based on the API response
      pointsWithText.forEach((pointInfo: any) => {
        const point = {
          type: "point",
          longitude: pointInfo.lon,
          latitude: pointInfo.lat,
          text: pointInfo.text,
        };

        const textSymbol = {
          type: "text",
          color: [255, 255, 255],
          haloColor: [0, 0, 0],
          haloSize: 1,
          text: pointInfo.text,
          xoffset: 0,
          yoffset: 10,
          font: {
            size: 12,
            family: "sans-serif",
          },
        };

        const pointGraphic = new Graphic({
          geometry: point,
          symbol: {
            type: "simple-marker",
            color: [226, 119, 40],
            outline: {
              color: [255, 255, 255],
              width: 2,
            },
            size: 15,
          },
        });

        const textGraphic = new Graphic({
          geometry: point,
          symbol: textSymbol,
        });

        // Add both point and text graphics to the customPointLayer
        this.graphicsLayer.addMany([pointGraphic, textGraphic]);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  getGraphicsLayer() {
    return this.graphicsLayer;
  }
}

export default CustomPointLayer;
