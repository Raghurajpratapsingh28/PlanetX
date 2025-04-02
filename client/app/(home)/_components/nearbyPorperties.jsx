
'use client'

import Image from "next/image"
import { Heart } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const properties = [
  {
    id: 1,
    title: "Vishvarni Society",
    type: "4 BHK Flat",
    location: "Dev Nagar, Karol Bagh",
    price: "₹17.5 Lac",
    pricePerSqft: "₹3,500",
    status: "Under Construction",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Vishvarni Society",
    type: "4 BHK Flat",
    location: "Dev Nagar, Karol Bagh",
    price: "₹17.5 Lac",
    pricePerSqft: "₹3,500",
    status: "Under Construction",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Vishvarni Society",
    type: "4 BHK Flat",
    location: "Dev Nagar, Karol Bagh",
    price: "₹17.5 Lac",
    pricePerSqft: "₹3,500",
    status: "Under Construction",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Vishvarni Society",
    type: "4 BHK Flat",
    location: "Dev Nagar, Karol Bagh",
    price: "₹17.5 Lac",
    pricePerSqft: "₹3,500",
    status: "Under Construction",
    image: "/placeholder.svg"
  },
]


export const NearbyProperties = () => {
  return (
    <section className="w-full py-8 md:py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Nearby Property
          </h2>
        </div>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {properties.map((property) => (
                <CarouselItem 
                  key={property.id} 
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Card className="w-full max-w-[295px] mx-auto h-[361px] flex flex-col border border-[#E1E1E1] rounded-xl overflow-hidden">
                    <div className="relative w-full h-[180px] sm:h-[200px]">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-2 top-2 md:right-3 md:top-3 z-10 bg-white/80 hover:bg-white/90 rounded-full w-7 h-7 md:w-8 md:h-8"
                      >
                        <Heart className="w-4 h-4 md:w-5 md:h-5" />
                      </Button>
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex flex-col gap-2 p-3 md:p-4 flex-grow">
                      <h3 className="font-semibold text-base md:text-lg line-clamp-1">{property.title}</h3>
                      <div className="flex flex-col gap-1">
                        <p className="font-medium text-sm md:text-base">{property.type}</p>
                        <div className="flex items-center gap-1 text-gray-500">
                          <span className="text-xs md:text-sm line-clamp-1">{property.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="font-semibold text-base md:text-lg">{property.price}</p>
                          <p className="text-xs md:text-sm text-gray-500">{property.pricePerSqft} / sqft</p>
                        </div>
                        <div className="text-xs md:text-sm text-gray-500 text-right">
                          {property.status}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex gap-2 mt-4 md:absolute md:-top-14 md:right-0 md:mt-0">
              <CarouselPrevious className="w-8 h-8 md:w-10 md:h-10" />
              <CarouselNext className="w-8 h-8 md:w-10 md:h-10" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
