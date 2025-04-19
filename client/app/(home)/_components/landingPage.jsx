"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const LandingPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden">
      {/* Optimized Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="/bg-placeholder.jpg"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-4 py-16 sm:px-6 md:px-8 lg:px-16 text-center">
        <div className="flex flex-col gap-6 max-w-2xl">
          <p className="text-gray-200 font-light text-base sm:text-lg md:text-xl leading-relaxed">
            Explore top properties, connect with trusted agents, and take the next
            step towards your future.
          </p>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Find Your Dream Home, Hassle-Free
          </h1>
        </div>
        <div className="w-full max-w-3xl">
          <button onClick={()=>{router.push("/show-property")}} className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/50">
            Explore Property
          </button>
        </div>
      </div>
    </section>
  );
};