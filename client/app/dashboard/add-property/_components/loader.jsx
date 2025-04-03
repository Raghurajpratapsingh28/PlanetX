"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="absolute rounded-xl top-[200]  left-[600] inset-0 z-50 flex flex-col items-center justify-center bg-gray-50 w-[300px] h-[200px]">
      <Loader2 className="h-16 w-16 animate-spin text-black" />

      <p className="mt-4 text-xl font-bold text-black">
        Submitting your form...
      </p>
    </div>
  );
}
