"use client"

import { Suspense, useEffect} from "react";
import { AddPropertyForm } from "./_components/add-property";

export default function AddPropertyPage() {
  
  useEffect(()=>{
    const token = localStorage.getItem("accessToken");
    if(!token){
      window.location.href="/login"
    }
  },[])

  

  return (
    <>
      <div className="flex flex-col">
        <div className="font-semibold text-lg m-4">Add Property</div>
        <div className="m-4">
          <Suspense fallback={<div>Loading...</div>}>
            <AddPropertyForm />
          </Suspense>
        </div>
      </div>
    </>
  );
}
