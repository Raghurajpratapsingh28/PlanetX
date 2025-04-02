"use client";

import { Search } from "./searchproperties";

export const LandingPage = () => {
  return (
    <div
      className="bg-cover bg-center min-h-[85vh] w-full"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="flex flex-col items-center justify-center gap-6 py-16 px-4 sm:px-8 md:px-16 lg:px-32 h-full bg-black/20 text-center">
        <div className="flex flex-col gap-4 max-w-2xl w-full">
          <p className="text-gray-200 font-light text-base sm:text-lg md:text-xl leading-relaxed">
            Explore top properties, connect with trusted agents, and take the
            next step towards your future.
          </p>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Find Your Dream Home, Hassle-Free
          </h1>
        </div>
        <div className="w-full max-w-3xl">
          <Search />
        </div>
      </div>
    </div>
  );
};