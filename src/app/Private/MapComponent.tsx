import React, { useState, useEffect, useRef } from "react";
import { loadModules } from "esri-loader";
import CustomPointLayer from "./CustomPointLayer";
import { getSession } from "next-auth/react";

const MapComponent: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [clickedCoordinates, setClickedCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const modalRef = useRef(null);

  useEffect(() => {
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

    initializeMap();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic, e.g., send data to the server
    closeModal();
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
          className="modal fixed top-0 right-0 h-full w-1/4 bg-white shadow-md p-8 bg-slate-950 border-l border-stone-600"
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
                  type="text"
                  value={clickedCoordinates.latitude}
                  readOnly
                />
              </label>
              <label className="flex flex justify-between text-stone-400 p-2">
                Longitude : &nbsp;
                <input
                  type="text"
                  value={clickedCoordinates.longitude}
                  readOnly
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
                  className="bg--500 rounded-md p-2 dark:bg-indigo-400"
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
