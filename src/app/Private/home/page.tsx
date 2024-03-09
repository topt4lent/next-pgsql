"use client";
import { signOut } from "next-auth/react";
import { Map, Scene, WebScene } from "@esri/react-arcgis";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<S>({ status: null });
  interface S {
    status: string | null;
  }
  const handleFail = (e: any) => {
    console.error(e);
    setStatus({ status: "failed" });
  };

  return (
    <>
      <h1 className="text-black text-4xl text-center dark:text-stone-400 ">
        {" "}
        MAP
      </h1>
      <div className="bg-color-black">
        <div className="grid grid-cols-2 gap-4  rounded m-2 p-2">
          <div className="border text-white border-stone-700 rounded">
            {"1"}
          </div>
          {status.status === "failed" ? (
            <div className="dark:text-white">{"error"}</div>
          ) : (
            <div className="border border-stone-700 rounded text-white ">
              {"2"}
              {/* <WebScene
                className="full-screen-map"
                id="foobar"
                onFail={handleFail}
              /> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
