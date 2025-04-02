
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const features = [
  {
    title: "Expertise:",
    description: "Years of experience in the real estate market.",
  },
  {
    title: "Personalized Service",
    description: "Tailored solutions to fit your needs.",
  },
  {
    title: "Transparency",
    description: "Clear and honest communication at every step.",
  },
  {
    title: "Wide Listings",
    description: "Extensive database of properties to match every requirement.",
  },
]

export const WhyChooseUs = () => {
  return (
    <section className="w-full py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Why Choose Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="w-[75px] h-[75px] p-4 border rounded-lg flex items-center justify-center">
                  <Image
                    src="/villa.png"
                    alt="House icon"
                    width={45}
                    height={45}
                    className="object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

