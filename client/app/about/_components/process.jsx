"use client";

import Image from "next/image";

export const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Consultation",
      description: "We understand your needs and preferences.",
    },
    {
      number: "02",
      title: "Property Search",
      description:
        "Explore detailed listings with photos, descriptions, and key features to find the right fit.",
    },
    {
      number: "03",
      title: "Negotiation",
      description: "Get the best value for your investment.",
    },
    {
      number: "04",
      title: "Closing",
      description:
        "Connect with property owners instantly for quick and transparent communication.",
    },
  ];

  return (
    <section className="py-8 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Steps Column */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 text-center lg:text-left">
              Our Process
            </h2>
            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-start p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-md flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-medium text-purple-600">
                      {step.number}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg sm:text-xl font-medium text-gray-800">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Images Column */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
              {/* Main Image */}
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px]">
                <Image
                  src="/about-section.png"
                  alt="People reviewing property details"
                  className="rounded-lg object-cover"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  priority
                />
              </div>
              {/* Small Overlay Image */}
              <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 z-10">
                <Image
                  src="/about-section.png"
                  alt="Small property consultation image"
                  className="rounded-lg object-cover border-2 border-white shadow-md"
                  fill
                  sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 224px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};