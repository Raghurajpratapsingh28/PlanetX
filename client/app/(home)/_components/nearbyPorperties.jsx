
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
    <section className="w-full py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
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
            <CarouselContent>
              {properties.map((property) => (
                <CarouselItem key={property.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4 first:pl-0">
                  <Card className="w-[295px] h-[361px] flex flex-col border border-[#E1E1E1] rounded-xl overflow-hidden">
                    <div className="relative w-full h-[200px]">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-3 top-3 z-10 bg-white/80 hover:bg-white/90 rounded-full w-8 h-8"
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex flex-col gap-2 p-4">
                      <h3 className="font-semibold text-lg">{property.title}</h3>
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">{property.type}</p>
                        <div className="flex items-center gap-1 text-gray-500">
                          <span className="text-sm">{property.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="font-semibold text-lg">{property.price}</p>
                          <p className="text-sm text-gray-500">{property.pricePerSqft} / sqft</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.status}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -top-14 right-0 flex gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

