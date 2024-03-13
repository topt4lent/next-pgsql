"use client";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import MapComponent from "./MapComponent";
//import { Map, Scene } from "@esri/react-arcgis";
//import BermudaTriangle from "./Bermuda";
//import PointMark from "./PointMark";
//import Layer from "./Layer";

export default function Private(props: any) {
  // const [status, setStatus] = useState<S>({ status: null });
  // interface S {
  //   status: string | null;
  // }
  // const handleFail = (e: any) => {
  //   console.error(e);
  //   setStatus({ status: "failed" });
  // };

  return (
    <>
      <h1 className="text-black text-4xl text-center dark:text-stone-400">
        MapGIS
      </h1>
      <div className="border border-stone-700 rounded">
        {/* {status.status === "failed" ? (
          <div className="dark:text-white">{"error"}</div>
        ) : (
          <MapComponent />
        )} */}
        <MapComponent />
      </div>
    </>
  );
}
