import React, { useState, useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
import CustomPointLayer from "./CustomPointLayer";
//import { getSession } from "next-auth/react";

const MapComponent: React.FC = () => {
  const inputStyle = "p-2 border border-black rounded-md text-gray";
  const [isModalOpen, setModalOpen] = useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [formData, setFormData] = useState<{
    text: string;
    type: number;
  }>({
    text: "",
    type: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value }: { name: string; value: string } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const reloadMapData = async () => {
  //   try {
  //     const customPointLayerInstance = new CustomPointLayer();
  //     await customPointLayerInstance.fetchData();
  //     const updatedGraphicsLayer = customPointLayerInstance.getGraphicsLayer();
  //     // Assuming you have a reference to the map or view, you can update the layer
  //     // Replace this with the actual code you use to update the map layer
  //     map.layers.removeAll();
  //     map.layers.add(updatedGraphicsLayer);
  //   } catch (error) {
  //     console.error("Error reloading map data:", error);
  //   }
  // };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Prepare data to send to the API
    const postData = {
      lat: clickedCoordinates.latitude,
      lon: clickedCoordinates.longitude,
      text: formData.text,
      type: formData.type,
    };

    try {
      // Send POST request to the API endpoint
      const response = await fetch("/api/layer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        body: JSON.stringify(postData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log("Data successfully sent to the API");

        initializeMap();

        // Close the modal after submitting the form
        closeModal();
      } else {
        console.error("Failed to send data to the API");
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const initializeMap = async () => {
    try {
      const [Map, MapView] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
      ]);

      const customPointLayerInstance = new CustomPointLayer();
      await customPointLayerInstance.fetchData();
      const customPointGraphicsLayer =
        customPointLayerInstance.getGraphicsLayer();

      const map = new Map({
        basemap: "streets",
        layers: [customPointGraphicsLayer],
      });

      const view = new MapView({
        container: "mapViewDiv",
        map,
        center: [100.56492826387591, 13.88632466474838],
        zoom: 10,
      });

      view.on("click", (event: any) => {
        setModalOpen(true);
        const { latitude, longitude } = event.mapPoint;
        setClickedCoordinates({ latitude, longitude });
        // const session = await getSession({ req  });
        // const user = session.user;
        // const a: any = getSession();
        // console.log(a, "44");
      });

      // Add click event listener to close the modal when clicking outside of it
      document.addEventListener("click", handleClickOutsideModal);

      return () => {
        if (view) {
          view.destroy();
        }
        // Remove the click event listener when the component is unmounted
        document.removeEventListener("click", handleClickOutsideModal);
      };
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };

  useEffect(() => {
    initializeMap();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClickOutsideModal = (event: any) => {
    // Close the modal if the click is outside of the modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  return (
    <div>
      <div id="mapViewDiv" style={{ height: "100vh", width: "100%" }}></div>
      {isModalOpen && (
        <div
          className="modal fixed top-0 right-0 h-full w-1/4 bg-white shadow-md p-8 bg-slate-950 border-l border-stone-600 dark:bg-slate-900"
          ref={modalRef}
        >
          <div className="modal-content flex">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form onSubmit={handleFormSubmit}>
              <label className="flex text-stone-400 p-2">
                Latitude : &nbsp; &nbsp; &nbsp;
                <input
                  className={`${inputStyle}`}
                  type="text"
                  value={clickedCoordinates.latitude}
                  readOnly
                />
              </label>
              <label className="flex flex justify-between text-stone-400 p-2">
                Longitude : &nbsp;
                <input
                  className={`${inputStyle}`}
                  type="text"
                  value={clickedCoordinates.longitude}
                  readOnly
                />
              </label>
              <label className="flex flex justify-between text-stone-400 p-2">
                เหตุการณ์ : &nbsp;
                <input
                  name="text"
                  className={`${inputStyle}`}
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                  placeholder="เหตุการณ์หรือสถานที่"
                />
              </label>
              <label className="flex flex justify-between text-stone-400 p-2">
                type : &nbsp;
                <input
                  name="type"
                  className={`${inputStyle}`}
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e)
                  }
                  placeholder="ประเภท"
                />
              </label>
              <div className="flex justify-between">
                <button
                  className="bg-gray-500 rounded-md p-2 dark:bg-gray-500"
                  onClick={() => setModalOpen(false)}
                >
                  cancle
                </button>
                <button
                  className="bg-blue-500 rounded-md p-2 dark:bg-indigo-400"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
