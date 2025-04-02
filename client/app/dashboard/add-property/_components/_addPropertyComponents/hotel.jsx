"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SelectButton from "../selectButton";
import { useState } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Hotel = ({ form }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="subCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Sub-Category
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="focus:outline-none focus:ring-0 focus:border-transparent h-[50px]">
                    <SelectValue placeholder="Select Sub-Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hotel">Hotel</SelectItem>
                    <SelectItem value="Dormitory">Dormitory</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="propertyDetails.propertyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Property Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Property Name"
                  className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Property Type
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="focus:outline-none focus:ring-0 focus:border-transparent h-[50px]">
                    <SelectValue placeholder="Select Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Budget">Budget</SelectItem>
                    <SelectItem value="Luxury">Luxury</SelectItem>
                    <SelectItem value="Boutique">Boutique</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Heritage">Heritage</SelectItem>
                    <SelectItem value="Resort">Resort</SelectItem>
                    <SelectItem value="Hostel">Hostel</SelectItem>
                    <SelectItem value="Shared Dormitory">
                      Shared Dormitory
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="propertyDetails.starRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Star Rating
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Star Rating (1-5)"
                  className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    console.log(value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.totalRooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Total Rooms
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Total Rooms"
                  className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    console.log(value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="propertyDetails.roomTypes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Room Types
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  multiple
                >
                  <SelectTrigger className="focus:outline-none focus:ring-0 focus:border-transparent h-[50px]">
                    <SelectValue placeholder="Select Room Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single Room">Single Room</SelectItem>
                    <SelectItem value="Double Room">Double Room</SelectItem>
                    <SelectItem value="Suite">Suite</SelectItem>
                    <SelectItem value="Dormitory Bed">Dormitory Bed</SelectItem>
                    <SelectItem value="Family Room">Family Room</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2.5">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="roomDetails.rooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Room Details
                </FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Room Type */}
                    <FormField
                      control={form.control}
                      name="roomDetails.roomType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Type</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Room Type"
                              {...field}
                              className="h-[50px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Room Size */}
                    <FormField
                      control={form.control}
                      name="roomDetails.roomSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Size</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Room Size"
                              {...field}
                              className="h-[50px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Number of Beds */}
                    <FormField
                      control={form.control}
                      name="roomDetails.beds"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Beds</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Number of Beds"
                              {...field}
                              className="h-[50px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Bathroom Type */}
                    <FormField
                      control={form.control}
                      name="roomDetails.bathroomType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathroom Type</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Bathroom Type"
                              {...field}
                              className="h-[50px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Air Conditioning */}
                    <FormField
                      control={form.control}
                      name="roomDetails.airConditioning"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Air Conditioning</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full h-[50px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                            >
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Balcony */}
                    <FormField
                      control={form.control}
                      name="roomDetails.balcony"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Balcony</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full h-[50px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                            >
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Smoking Allowed */}
                    <FormField
                      control={form.control}
                      name="roomDetails.smokingAllowed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Smoking Allowed</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full h-[50px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                            >
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </select>
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Occupancy */}
                    <FormField
                      control={form.control}
                      name="roomDetails.occupancy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupancy</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Occupancy"
                              {...field}
                              className="h-[50px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Price Per Night */}
                    <FormField
                      control={form.control}
                      name="roomDetails.pricePerNight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Per Night</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Price Per Night"
                              {...field}
                              className="h-[50px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />

                    {/* Availability */}
                    <FormField
                      control={form.control}
                      name="roomDetails.availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availability</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="w-full h-[50px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                            >
                              <option value={true}>Available</option>
                              <option value={false}>Not Available</option>
                            </select>
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>

                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Hotel;
