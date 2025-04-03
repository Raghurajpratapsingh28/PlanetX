
'use client'

import { Building, Home, Hotel, Users, Warehouse, Map } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const propertyTypes = [
  {
    title: "House / Villa",
    count: "120 Properties",
    icon: '/villa.png',
  },
  {
    title: "Flat / Apartment",
    count: "120 Properties",
    icon: '/flat.png',
  },
  {
    title: "Hotels",
    count: "120 Properties",
    icon: '/hotel.png',
  },
  {
    title: "PG / Co-living",
    count: "120 Properties",
    icon: '/pg.png',
  },
  {
    title: "Ware House",
    count: "120 Properties",
    icon: '/ware-house.png',
  },
  {
    title: "Plot Or Land",
    count: "120 Properties",
    icon: '/plot-land.png',
  },
]

export const PropertyTypes = () => {
  return (
    <section className="w-full py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Explore Properties
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
              {propertyTypes.map((type, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/6 pl-4 first:pl-4">
                  <Card className="w-[190px] h-[198px] rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:shadow-[0px_8px_15px_0px_#01010114] transition-all">
                    <CardContent className="p-5 flex flex-col h-full">
                      <div className="w-[72px] h-[72px] bg-[#F8F8F8] rounded-2xl flex items-center justify-center mb-6">
                        <Image width={45} height={45} src={type.icon} alt="type icon" />,
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="text-[18px] font-semibold text-gray-900">{type.title}</h3>
                        <p className="text-[14px] text-gray-500">{type.count}</p>
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


