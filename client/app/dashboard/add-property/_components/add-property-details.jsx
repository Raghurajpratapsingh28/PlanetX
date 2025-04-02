"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from "next/navigation";
import Residential from "./_addPropertyComponents/residential";
import SelectButton from "./selectButton";
import Pg from "./_addPropertyComponents/pg";
import { PGFormSchema } from "../_SchemaValidation/pgFormSchema";
import { ResidentialformSchema } from "../_SchemaValidation/ResidentialFormschema";
import { BasePropertySchema } from "../_SchemaValidation/basePropertySchema";
import Hotel from "./_addPropertyComponents/hotel";
import { HotelSchema } from "../_SchemaValidation/hotelSchema";
import Office from "./_addPropertyComponents/office";
import Shop from "./_addPropertyComponents/shop";
import { OfficeSchema } from "../_SchemaValidation/officeSchema";
import { ShopSchema } from "../_SchemaValidation/shopSchema";
import Warehouse from "./_addPropertyComponents/warehouse";
import { warehouseSchema } from "../_SchemaValidation/warehouseSchema";
import EventSpace from "./_addPropertyComponents/eventSpace";
import eventSpaceSchema from "../_SchemaValidation/eventSpaceSchema";
import SharedWarehouseForm from "./_addPropertyComponents/sharedWarehouse";
import { sharedWarehouseSchema } from "../_SchemaValidation/sharedWarehouseSchema";

export const PropertyDetailsForm = ({
  propertyData,
  setPropertyData,
  currentStep,
  setCurrentStep,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const propertyKind = searchParams.get("propertyKind");
  const propertyType = searchParams.get("propertyType");

  const schema = {
    Residential: BasePropertySchema.merge(ResidentialformSchema),
    Pg: BasePropertySchema.merge(PGFormSchema),
    Hotel: BasePropertySchema.merge(HotelSchema),
    Office: BasePropertySchema.merge(OfficeSchema),
    Shop: BasePropertySchema.merge(ShopSchema),
    Warehouse: BasePropertySchema.merge(warehouseSchema),
    EventSpace: BasePropertySchema.merge(eventSpaceSchema),
    "Shared Warehouse": BasePropertySchema.merge(sharedWarehouseSchema),
  }[propertyKind] || BasePropertySchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: propertyData || {
      propertyType,
      category: propertyKind,
      location: {
        city: "",
        state: "",
        locality: "",
        subLocality: "",
        apartment: "",
        houseNumber: "",
      },
      ...(propertyKind === "Residential" && {
        about: { bedrooms: 1, bathrooms: 1, balconies: 0 },
        parking: { covered: 0, open: 0 },
        otherRooms: { poojaRoom: false, guestRoom: false, servantRoom: false, studyRoom: false },
        furnishingDetails: {},
        propertyArea: { carpetArea: 0, builtUpArea: undefined },
        furnishingStatus: "Unfurnished",
        totalFloors: 0,
        propertyOnFloor: 0,
      }),
      ...(propertyKind === "Pg" && {
        subCategory: "Boys PG",
        roomDetails: { sharingType: "Single Sharing", bedCount: 1, attachedBathroom: false, balcony: false, roomSize: "" },
        mealDetails: { mealIncluded: false, mealType: "Vegetarian", mealFrequency: "Breakfast", customizationAllowed: false },
        parking: { covered: 0, open: 0 },
      }),
      availabilityStatus: "Ready to Move",
      availableFrom: "",
      ageOfProperty: 0,
      description: "",
    },
  });

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      setPropertyData({ ...propertyData, ...values });
      toast({ title: "Success", description: "Property details saved!" });
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to save property details", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-2 sm:px-4 md:px-6 lg:px-8">
      <Card className="w-full max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-3">
            Property Details
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Property Type */}
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Type</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <select
                            {...field}
                            disabled
                            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600 text-sm sm:text-base appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="For Sale">For Sale</option>
                            <option value="For Rent">For Rent</option>
                            <option value="Commercial">Commercial</option>
                          </select>
                          <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                {/* Property Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Category</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <select
                            {...field}
                            disabled
                            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600 text-sm sm:text-base appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value={propertyKind}>{propertyKind}</option>
                          </select>
                          <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                {/* Location Fields */}
                {["city", "state", "locality", "subLocality", "apartment", "houseNumber"].map((fieldName) => (
                  <FormField
                    key={fieldName}
                    control={form.control}
                    name={`location.${fieldName}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          {fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, " $1")}{" "}
                          {fieldName === "subLocality" || fieldName === "houseNumber" ? "(Optional)" : ""}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`Enter ${fieldName.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </FormControl>
                        <FormMessage className="text-xs sm:text-sm" />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Property Specific Components */}
              <div className="space-y-4">
                {propertyKind === "Residential" && <Residential form={form} propertyKind={propertyKind} propertyType={propertyType} />}
                {propertyKind === "Pg" && <Pg form={form} />}
                {propertyKind === "Hotel" && <Hotel form={form} />}
                {propertyKind === "Office" && <Office form={form} />}
                {propertyKind === "Shop" && <Shop form={form} />}
                {propertyKind === "Warehouse" && <Warehouse form={form} />}
                {propertyKind === "EventSpace" && <EventSpace form={form} />}
                {propertyKind === "Shared Warehouse" && <SharedWarehouseForm form={form} />}
              </div>

              {/* Availability Status */}
              <FormField
                control={form.control}
                name="availabilityStatus"
                render={({ field }) => (
                  <FormItem>
                    <SelectButton
                      name="Availability Status"
                      options={["Ready to Move", "Under Construction"]}
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full sm:w-auto"
                    />
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                {/* Available From */}
                <FormField
                  control={form.control}
                  name="availableFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Available From</FormLabel>
                      <FormControl>
                        <DatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date?.toISOString().split("T")[0])}
                          className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          dateFormat="yyyy-MM-dd"
                        />
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />

                {/* Age of Property */}
                <FormField
                  control={form.control}
                  name="ageOfProperty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">Age of Property</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <select
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="">Select age</option>
                            {[...Array(20)].map((_, i) => (
                              <option key={i} value={i}>{i} years</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Add property description"
                        className="w-full p-2 sm:p-3 border border-gray-300 rounded-md min-h-[100px] sm:min-h-[120px] text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-md text-sm sm:text-base transition-colors"
                >
                  {isSubmitting ? "Submitting..." : "Next"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};