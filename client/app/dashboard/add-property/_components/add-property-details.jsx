"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChevronDown, Minus, Plus, X } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
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

  const schema =
    propertyKind === "Residential"
      ? BasePropertySchema.merge(ResidentialformSchema)
      : propertyKind === "Pg"
      ? BasePropertySchema.merge(PGFormSchema)
      : propertyKind === "Hotel"
      ? BasePropertySchema.merge(HotelSchema)
      : propertyKind === "Office"
      ? BasePropertySchema.merge(OfficeSchema)
      : propertyKind === "Shop"
      ? BasePropertySchema.merge(ShopSchema)
      : propertyKind === "Warehouse"
      ? BasePropertySchema.merge(warehouseSchema)
      : propertyKind === "EventSpace"
      ? BasePropertySchema.merge(eventSpaceSchema)
      : propertyKind === "Shared Warehouse"
      ? BasePropertySchema.merge(sharedWarehouseSchema)
      : BasePropertySchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: (() => {
      if (propertyKind === "Residential") {
        return {
          propertyType: propertyType,
          category: propertyKind,
          location: {
            city: "",
            state: "",
            locality: "",
            subLocality: "",
            apartment: "",
            houseNumber: "",
          },
          about: {
            bedrooms: 1,
            bathrooms: 1,
            balconies: 0,
          },
          parking: {
            covered: 0,
            open: 0,
          },
          otherRooms: {
            poojaRoom: false,
            guestRoom: false,
            servantRoom: false,
            studyRoom: false,
          },
          furnishingDetails: {},
          propertyArea: {
            carpetArea: 0,
            builtUpArea: undefined,
          },
          furnishingStatus: "Unfurnished",
          totalFloors: 0,
          propertyOnFloor: 0,
          availabilityStatus: "Ready to Move",
          availableFrom: "",
          ageOfProperty: 0,
          description: "",
        };
      } else if (propertyKind === "Pg") {
        return {
          propertyType: propertyType,
          category: propertyKind,
          location: {
            city: "",
            state: "",
            locality: "",
            subLocality: "",
            apartment: "",
            houseNumber: "",
          },
          subCategory: "Boys PG",
          roomDetails: {
            sharingType: "Single Sharing",
            bedCount: 1,
            attachedBathroom: false,
            balcony: false,
            roomSize: "",
          },
          mealDetails: {
            mealIncluded: false,
            mealType: "Vegetarian",
            mealFrequency: "Breakfast",
            customizationAllowed: false,
          },
          parking: {
            covered: 0,
            open: 0,
          },
          ageOfProperty: 0,
          description: "",
        };
      } else if (propertyKind === "Hotel") {
        return {
          propertyType: propertyType,
          category: propertyKind,
          location: {
            city: "",
            state: "",
            locality: "",
            subLocality: "",
            apartment: "",
            houseNumber: "",
          },
          subCategory: "Hotel",
          propertyDetails: {
            propertyName: "",
            propertyType: "Budget",
            starRating: 3,
            totalRooms: 10,
            roomTypes: "",
          },
          roomDetails: {
            roomType: "Standard",
            roomSize: "Medium",
            beds: 1,
            bathroomType: "Attached",
            airConditioning: true,
            balcony: false,
            smokingAllowed: false,
            occupancy: "2",
            pricePerNight: 100,
            availability: true,
          },
          parking: {
            covered: 2,
            open: 5,
          },
          ageOfProperty: 0,
          description: "",
        };
      } else if (propertyKind === "Office") {
        return {
          propertyType: propertyType,
          category: propertyKind,
          location: {
            city: "",
            state: "",
            locality: "",
            subLocality: "",
            apartment: "",
            houseNumber: "",
          },
          subCategory: "Office",
          transactionType: "",
          propertyDetails: {
            propertyName: "",
            officeType: "",
            builtUpArea: { size: 0, unit: "sq ft" },
            carpetArea: { size: 0, unit: "sq ft" },
            furnishedStatus: "",
            furnishingDetails: {
              workstations: 0,
              cabinRooms: 0,
              meetingRooms: 0,
              conferenceRooms: 0,
              pantry: false,
              cafeteria: false,
              serverRoom: false,
              airConditioning: false,
            },
            floorDetails: {
              totalFloors: 1,
              officeOnFloor: 1,
            },
          },
          ageOfProperty: 0,
          description: "",
        };
      } else if (propertyKind === "Shop") {
        return {
          propertyType: propertyType,
          category: propertyKind,
          location: {
            city: "",
            state: "",
            locality: "",
            subLocality: "",
            apartment: "",
            houseNumber: "",
          },
          subCategory: "Retail/Shop",
          transactionType: "For Sale",
          propertyDetails: {
            propertyName: "",
            shopType: "Standalone Shop",
            builtUpArea: { size: 0, unit: "sq ft" },
            carpetArea: { size: 0, unit: "sq ft" },
            furnishedStatus: "Unfurnished",
            furnishingDetails: {
              shelves: 0,
              displayRacks: 0,
              cashCounter: 0,
              airConditioning: false,
              cctvCameras: 0,
              powerBackup: false,
              washroom: false,
              pantry: false,
            },
            floorDetails: {
              totalFloors: 1,
              shopOnFloor: 1,
            },
          },

          ageOfProperty: 0,
          description: "",
        };
      } else if (propertyKind === "Warehouse") {
        return {
          propertyType: propertyType,
          category: propertyKind,
          location: {
            city: "",
            state: "",
            locality: "",
            subLocality: "",
            apartment: "",
            houseNumber: "",
          },
          subCategory: "Warehouse/Storage",
          transactionType: "",
          propertyDetails: {
            propertyName: "",
            warehouseType: "",
            builtUpArea: {
              size: 0,
              unit: "sq ft",
            },
            carpetArea: {
              size: 0,
              unit: "sq ft",
            },
            furnishedStatus: "",
            floorDetails: {
              totalFloors: 0,
              propertyOnFloor: 0,
            },
            floorLoadCapacity: {
              value: 0,
              unit: "kg/sq ft",
            },
            clearHeight: {
              value: 0,
              unit: "ft",
            },
            dockDoors: 0,
            rampAccess: false,
          },
        };
      } else if (propertyKind === "EventSpace") {
        return {
          propertyType: propertyType,
          category: propertyKind,
          location: {
            city: "",
            state: "",
            locality: "",
            subLocality: "",
            apartment: "",
            houseNumber: "",
          },
          subCategory: "Event Space",
          type: "Event Space",
          propertyDetails: {
            totalGuests: 0,
            seatingArrangement: {
              theaterStyle: 0,
              classroomStyle: 0,
              banquetStyle: 0,
              conferenceStyle: 0,
            },
          },
        };
      } else if (propertyKind === "Shared Warehouse") {
        return {
          propertyType: propertyType,
          category: propertyKind,
          location: {
            city: "",
            state: "",
            locality: "",
            subLocality: "",
            apartment: "",
            houseNumber: "",
          },
          subCategory: "Shared Workspace",
          propertyDetails: {
            workspaceName: "",
            type: "",
            capacity: {
              totalSeats: 0,
              availableSeats: 0,
            },
          },
        };
      }
      return {};
    })(),
  });
  function onSubmit(values) {
    setIsSubmitting(true);

    try {
      setPropertyData({ ...values });
      toast({
        title: "Success",
        description: "Property added successfully!",
        variant: "default",
      });
      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to add property",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-[835px] bg-white border border-[#E1E1E1] rounded-xl p-5">
      <CardContent className="p-0">
        <div className="border-b border-[#E1E1E1] pb-2.5 mb-5">
          <h2 className="text-xl font-medium font-poppins text-[#000000]">
            Property Details
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Type
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          {...field}
                          className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                        >
                          <option value="">Select Type</option>
                          <option value="For Sale">For Sale</option>
                          <option value="For Rent">For Rent</option>
                          <option value="Commercial">Commercial</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Property Category
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          {...field}
                          className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                        >
                          <option value="">Select Category</option>
                          <option value="Residential">Residential</option>
                          <option value="Pg">Paying Guest</option>
                          <option value="Hotel">Hotel</option>
                          <option value="Office">Office</option>
                          <option value="Shop">Shop</option>
                          <option value="Warehouse">Warehouse</option>
                          <option value="Shared Warehouse">
                            Shared Warehouse
                          </option>
                          <option value="EventSpace">EventSpace</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter City"
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

<FormField
  control={form.control}
  name="location.state"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
        State
      </FormLabel>
      <FormControl>
        <div className="relative">
          <select
            {...field}
            className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
          >
            <option value="">Select State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
            <option value="Delhi">Delhi</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Puducherry">Puducherry</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
        </div>
      </FormControl>
      <FormMessage className="text-red-500 text-sm" />
    </FormItem>
  )}
/>


              <FormField
                control={form.control}
                name="location.locality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Locality / Apartment
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Locality / Apartment"
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.subLocality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Sub Locality (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Sub Locality"
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.apartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Apartment
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Apartment"
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location.houseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      House No. (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter House No."
                        className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>
            {propertyKind == "Residential" ? (
              <Residential
                propertyKind={propertyKind}
                propertyType={propertyType}
                form={form}
              />
            ) : propertyKind == "Pg" ? (
              <Pg form={form} />
            ) : propertyKind == "Hotel" ? (
              <Hotel form={form} />
            ) : propertyKind == "Office" ? (
              <Office form={form} />
            ) : propertyKind == "Shop" ? (
              <Shop form={form} />
            ) : propertyKind == "Warehouse" ? (
              <Warehouse form={form} />
            ) : propertyKind == "EventSpace" ? (
              <EventSpace form={form} />
            ) : propertyKind == "Shared Warehouse" ? (
              <SharedWarehouseForm form={form} />
            ) : (
              ""
            )}

<FormField
  control={form.control}
  name="availabilityStatus"
  render={({ field }) => (
    <FormItem>
      <SelectButton
        name="Availability Status"
        options={["Available", "Rented", "Sold", "Under Construction"]}
        value={field.value}
        onChange={field.onChange}
      />
      <FormMessage className="text-red-500 text-sm" />
    </FormItem>
  )}
/>


            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="availableFrom"
                render={({ field, fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Available From
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) =>
                            field.onChange(date.toISOString().split("T")[0])
                          }
                          className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins w-full"
                          dateFormat="yyyy-MM-dd"
                        />
                      </div>
                    </FormControl>
                    {error && (
                      <p className="text-red-500 text-sm mt-1">
                        {error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ageOfProperty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                      Age of Property
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <select
                          {...field}
                          className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins appearance-none"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        >
                          <option value="">Select Age of Property</option>
                          {[...Array(20)].map((_, i) => (
                            <option key={i} value={i}>
                              {i} years
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#0F0D0D] pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                    Add Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add Description"
                      className="min-h-[126px] px-[15px] py-4 border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-[50px] bg-[#7B00FF] text-white font-medium font-poppins rounded-[10px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Property Details"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
