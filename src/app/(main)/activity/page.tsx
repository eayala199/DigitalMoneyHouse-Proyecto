"use client"
import React, { useState, useEffect } from "react";
import Menu from "@/app/components/menu/menu";
import ActivityList from "@/app/components/activity/ActivityList";
import ClipLoader from "react-spinners/ClipLoader"; 

const ActivityPage = () => {
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
    <div className="flex">
      <Menu />
      <main className="flex-1 p-4 flex flex-col items-center mt-8 min-h-screen">
        <h1 className="block text-2xl font-bold mb-4 sm:hidden">Actividad</h1>
        <ActivityList />
      </main>
    </div>
  );
};

export default ActivityPage;
