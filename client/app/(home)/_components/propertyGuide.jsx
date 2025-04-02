import Image from "next/image"
import { Card } from "@/components/ui/card"

const steps = [
  {
    number: "01",
    title: "Find Property",
    description: "Search for properties that match your preferences using filters for location, type, and budget.",
  },
  {
    number: "02",
    title: "View Property",
    description: "Explore detailed listings with photos, descriptions, and key features to find the right fit.",
  },
  {
    number: "03",
    title: "Direct Discussion",
    description: "Connect with property owners instantly for quick and transparent communication.",
  },
]

export const PropertyGuide = () => {
  return (
    <div className="w-full py-8 md:py-16 px-4 bg-[#F5F5FA]">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side images */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-[300px] md:h-full">
                <Image
                  src="/left-main.png"
                  alt="Couple searching for property"
                  width={400}
                  height={600}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-4">
                <Image
                  src="/right-up.png"
                  alt="Modern property exterior"
                  width={400}
                  height={290}
                  className="w-full h-[150px] md:h-[290px] object-cover rounded-xl"
                />
                <Image
                  src="/right-down.png"
                  alt="Modern property interior"
                  width={400}
                  height={290}
                  className="w-full h-[150px] md:h-[290px] object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Right side content */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">
              How to Choose Your Property
            </h2>
            <div className="flex flex-col gap-4">
              {steps.map((step) => (
                <Card
                  key={step.number}
                  className="flex flex-col sm:flex-row items-start p-4 md:p-[30px] gap-4 md:gap-5 w-full border border-[#E1E1E1] rounded-xl"
                >
                  <div className="flex items-center justify-center w-[48px] h-[48px] md:w-[52px] md:h-[52px] bg-[#F3EBFF] rounded-xl flex-shrink-0">
                    <span className="text-[#8424FF] text-lg md:text-xl font-semibold">
                      {step.number}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <h3 className="text-lg md:text-xl font-semibold">{step.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}