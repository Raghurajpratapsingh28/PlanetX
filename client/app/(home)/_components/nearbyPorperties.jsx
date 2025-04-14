'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Heart, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import BACKEND_URL from '@/lib/BACKEND_URL'
import { useRouter } from 'next/navigation'

export const NearbyProperties = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState([])
  const [wishlistLoading, setWishlistLoading] = useState({})
  const [userId, setUserId] = useState(null)
  const { toast } = useToast()
  const router = useRouter()

  // Fetch user ID and wishlist
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken')?.replace(/^"|"$/g, '')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const userResponse = await axios.get(`${BACKEND_URL}/auth/get-user`, {
          headers: { Authorization: token },
        })
        const fetchedUserId = userResponse.data.user._id
        setUserId(fetchedUserId)

        const wishlistResponse = await axios.get(
          `${BACKEND_URL}/wishlist/get-wishlist/${fetchedUserId}`,
          { headers: { Authorization: token } }
        )
        const wishlistProperties =
          wishlistResponse.data.wishlistsData?.map((item) => item._id) || []
        setWishlist(wishlistProperties)
      } catch (error) {
        console.error('Error fetching user or wishlist data:', error)
      }
    }

    fetchUserData()
  }, [])

  // Fetch nearby properties
  useEffect(() => {
    const fetchNearbyProperties = async () => {
      const token = localStorage.getItem('accessToken')?.replace(/^"|"$/g, '')
      if (!token) {
        setLoading(false)
        toast({
          title: 'Error',
          description: 'Please log in to view nearby properties',
          variant: 'destructive',
        })
        return
      }

      try {
        setLoading(true)
        const response = await axios.get(
          `${BACKEND_URL}/properties/nearby-properties`,
          {
            headers: { Authorization: token },
          }
        )
        setProperties(response.data.nearbyProperties || [])
      } catch (error) {
        console.error('Error fetching nearby properties:', error)
        toast({
          title: 'Error',
          description: 'Failed to fetch nearby properties',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNearbyProperties()
  }, [])

  // Handle wishlist toggle
  const handleWishlistToggle = async (propertyId) => {
    if (!userId) {
      toast({
        title: 'Error',
        description: 'Please log in to manage your wishlist',
        variant: 'destructive',
      })
      return
    }

    setWishlistLoading((prev) => ({ ...prev, [propertyId]: true }))
    const token = localStorage.getItem('accessToken')?.replace(/^"|"$/g, '')
    const isInWishlist = wishlist.includes(propertyId)

    try {
      if (isInWishlist) {
        const response = await axios.delete(
          `${BACKEND_URL}/wishlist/remove/${propertyId}`,
          {
            headers: { Authorization: token },
          }
        )

        if (response.status === 200) {
          setWishlist(wishlist.filter((id) => id !== propertyId))
          toast({
            title: 'Success',
            description: 'Property removed from wishlist',
            variant: 'success',
          })
        }
      } else {
        await axios.post(
          `${BACKEND_URL}/wishlist/add-wishlist`,
          { userId, propertyIds: [propertyId] },
          { headers: { Authorization: token } }
        )
        setWishlist([...wishlist, propertyId])
        toast({
          title: 'Success',
          description: 'Property added to wishlist',
          variant: 'success',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${
          isInWishlist ? 'remove from' : 'add to'
        } wishlist`,
        variant: 'destructive',
      })
    } finally {
      setWishlistLoading((prev) => ({ ...prev, [propertyId]: false }))
    }
  }

  // Format price
  // const formatPrice = (pricing) => {
  //   if (pricing?.price?.amount) {
  //     return `₹${pricing.price.amount.toLocaleString('en-IN')}`
  //   } else if (pricing?.expectedPrice) {
  //     return `₹${pricing.expectedPrice.toLocaleString('en-IN')}`
  //   } else if (pricing?.monthlyRent) {
  //     return `₹${pricing.monthlyRent.toLocaleString('en-IN')}/mo`
  //   }
  //   return 'Price N/A'
  // }

  // Format location
  const getLocationString = (location) =>
    [
      location?.subLocality,
      location?.locality,
      location?.city,
    ]
      .filter(Boolean)
      .join(', ')

  return (
    <section className="w-full py-8 md:py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Nearby Properties
          </h2>
        </div>
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="animate-spin h-12 w-12 text-teal-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading nearby properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <p className="text-center text-gray-600 py-12">
            No nearby properties available at the moment.
          </p>
        ) : (
          <div className="relative">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {properties.map((property) => (
                  <CarouselItem
                    key={property._id}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <Card className="w-full max-w-[320px] mx-auto h-[400px] flex flex-col border border-[#E1E1E1] rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative w-full h-[220px]">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-2 top-2 md:right-3 md:top-3 z-10 bg-white/80 hover:bg-white/90 rounded-full w-8 h-8"
                          onClick={() => handleWishlistToggle(property._id)}
                          disabled={wishlistLoading[property._id]}
                        >
                          {wishlistLoading[property._id] ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Heart
                              className={`h-5 w-5 ${
                                wishlist.includes(property._id)
                                  ? 'text-red-500 fill-red-500'
                                  : 'text-gray-500'
                              }`}
                            />
                          )}
                        </Button>
                        <Image
                          src={property.images?.[0]?.url || '/default-property.jpg'}
                          alt={property.location?.subLocality || 'Property'}
                          width={320}
                          height={220}
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                      <CardContent className="flex flex-col gap-3 p-4 flex-grow">
                        <h3 className="font-semibold text-lg line-clamp-1">
                          {property.location?.subLocality || 'Unnamed Property'}
                        </h3>
                        <div className="flex flex-col gap-2">
                          <p className="font-medium text-base text-teal-600">
                            {property.category || 'Unknown'}
                          </p>
                          <div className="flex items-center gap-1 text-gray-600">
                            <span className="text-sm line-clamp-1">
                              {getLocationString(property.location)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div>
                            <p className="font-semibold text-lg">
                              {property?.pricing?.price?.amount
                                ? `₹${property.pricing.price.amount.toLocaleString(
                                    "en-IN"
                                  )}`
                                : property?.pricing?.expectedPrice
                                ? `₹${property.pricing.expectedPrice.toLocaleString(
                                    "en-IN"
                                  )}`
                                : property?.pricing?.monthlyRent
                                ? `₹${property.pricing.monthlyRent.toLocaleString(
                                    "en-IN"
                                  )}/mo`
                                : "Price N/A"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {property.builtUpArea?.size
                                ? `₹${(
                                    property.pricing[0]?.price?.amount /
                                    property.builtUpArea.size
                                  ).toLocaleString('en-IN', {
                                    maximumFractionDigits: 0,
                                  })} / sqft`
                                : 'N/A'}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-sm text-gray-500">
                              {property.propertyStatus}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-sm bg-teal-50 hover:bg-teal-100 border-teal-200"
                              onClick={() => router.push(`/show-property/${property._id}`)}
                            >
                              View Details
                            </Button>
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
        )}
      </div>
    </section>
  )
}