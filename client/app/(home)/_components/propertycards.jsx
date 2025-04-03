import { Building } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const propertyCards = [
  {
    title: "Buy Property",
    description:
      "Browse rental properties that fit your lifestyle and budget. Flexible terms, verified listings.",
  },
  {
    title: "Rent Property",
    description:
      "Discover homes for sale in prime locations. Find the perfect property to call your own.",
  },
  {
    title: "Hotels",
    description:
      "Book your stay at top-rated hotels for business or leisure trips. Comfortable and affordable options.",
  },
  {
    title: "Paying Guest",
    description:
      "Looking for a shared living space? Explore verified PG accommodations near you.",
  },
]

export const PropertyCards = () => {
  return (
    <section className="w-full py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Find the Perfect Place for Every Need
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {propertyCards.map((card, index) => (
            <Card
              key={index}
              className="w-[295px] h-[297px] p-5 border border-t border-l rounded-tl-xl transition-all hover:shadow-[0px_8px_15px_0px_#01010114]"
            >
              <CardContent className="flex flex-col h-full gap-5">
                <div className="w-[75px] h-[75px] border-[1px] rounded-[8px] flex items-center justify-center">
                  <Image height={45} width={45} src='/villa.png' alt="Villa icon" />
                </div>
                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-semibold">{card.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
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



