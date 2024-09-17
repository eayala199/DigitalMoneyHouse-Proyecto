"use client"
import React, { useState, useEffect } from "react";
import Body from "./components/body/Body";
import ClipLoader from "react-spinners/ClipLoader"; 

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"lime"} loading={loading} />
      </div>
    );
  }
  return (
    <>
      <div>
        <Body/>
      </div>
    </>
  );
}
