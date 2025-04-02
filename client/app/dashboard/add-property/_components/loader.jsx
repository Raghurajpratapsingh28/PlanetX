"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-100/80 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-xs sm:max-w-sm mx-4">
        <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 animate-spin text-gray-800 mx-auto" />
        <p className="mt-4 text-lg sm:text-xl font-semibold text-gray-800 text-center">
          Submitting your form...
        </p>
      </div>
    </div>
  );
}