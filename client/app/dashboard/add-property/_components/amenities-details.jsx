"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ResidentialAmenties from "../_amentiesComponents/residentialAmenties";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import { residentialAmmentiesFormSchema } from "../_amentiesComponents/_schema/residentialFormSchema";
import { useToast } from "@/hooks/use-toast";
import { pgFormSchema } from "../_amentiesComponents/_schema/pgFormSchema";
import PGAmenities from "../_amentiesComponents/pgAmmenties";
import HotelAmentiesForm from "../_amentiesComponents/hotelAmenties";
import { hotelFormSchema } from "../_amentiesComponents/_schema/hotelFormSchema";
import { hotelDefaults } from "../_amentiesComponents/default/hotelDefaullt";
import OfficeAmenities from "../_amentiesComponents/officeAmenties";
import officeDefault from "../_amentiesComponents/default/officeDefault";
import { officeAmmentiesSchema } from "../_amentiesComponents/_schema/officeFormSchema";
import ShopForm from "../_amentiesComponents/shopAmenties";
import { shopFormAmmentiesScehma } from "../_amentiesComponents/_schema/shopFormSchema";
import { shopDefault } from "../_amentiesComponents/default/shopDefault";
import Warehouse from "../_amentiesComponents/warehouseAmenties";
import { WarehouseSchema } from "../_amentiesComponents/_schema/warehouseScehma";
import { warehouseDefault } from "../_amentiesComponents/default/warehouseDefault";
import SharedWarehouseForm from "./_addPropertyComponents/sharedWarehouse";
import ShareWarehouseAmenties from "../_amentiesComponents/sharedWarehouseAmenties";
import { sharedWarehouseDefault } from "../_amentiesComponents/default/sharedWarehouseDefault";
import { sharedWorkspaceAmentiesSchema } from "../_amentiesComponents/_schema/sharedWarehouseSchema";
import EventSpaceAmentiesForm from "../_amentiesComponents/eventSpaceAmenties";
import { eventSpaceSchema } from "../_amentiesComponents/_schema/eventSpaceAmenties";
import { eventSpaceDefaultValues } from "../_amentiesComponents/default/eventSpace";

export default function AmenitiesDetails({
  propertyData,
  setPropertyData,
  setCurrentStep,
}) {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const propertyKind = searchParams.get("propertyKind");
  const schema =
    propertyKind === "Residential"
      ? residentialAmmentiesFormSchema
      : propertyKind === "Pg"
      ? pgFormSchema
      : propertyKind === "Hotel"
      ? hotelFormSchema
      : propertyKind === "Office"
      ? officeAmmentiesSchema
      : propertyKind === "Shop"
      ? shopFormAmmentiesScehma
      : propertyKind === "Warehouse"
      ? WarehouseSchema
      : propertyKind === "Shared Warehouse"
      ? sharedWorkspaceAmentiesSchema
      : propertyKind === "EventSpace"
      ? eventSpaceSchema
      : "";

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues:
      propertyKind === "Hotel"
        ? hotelDefaults
        : propertyKind === "Office"
        ? officeDefault
        : propertyKind === "Shop"
        ? shopDefault
        : propertyKind === "Warehouse"
        ? warehouseDefault
        : propertyKind === "Shared Warehouse"
        ? sharedWarehouseDefault
        : propertyKind === "EventSpace"
        ? eventSpaceDefaultValues
        : "",
  });
  function onSubmit(values) {
    try {
      setPropertyData((prevPropertyData) => ({
        ...prevPropertyData,
        ...values,
      }));
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
    }
  }
  return (
    <Card className="w-full max-w-[835px] p-5 space-y-5">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-medium text-[#000000] border-b pb-3">
          Amenities Details
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {propertyKind === "Residential" ? (
            <ResidentialAmenties form={form} />
          ) : propertyKind === "Pg" ? (
            <PGAmenities form={form} />
          ) : propertyKind === "Hotel" ? (
            <HotelAmentiesForm form={form} />
          ) : propertyKind === "Office" ? (
            <OfficeAmenities form={form} />
          ) : propertyKind === "Shop" ? (
            <ShopForm form={form} />
          ) : propertyKind === "Warehouse" ? (
            <Warehouse form={form} />
          ) : propertyKind === "Shared Warehouse" ? (
            <ShareWarehouseAmenties form={form} />
          ) : propertyKind === "EventSpace" ? (
            <EventSpaceAmentiesForm form={form} />
          ) : (
            ""
          )}
          <Button
            type="submit"
            className="w-full h-[50px] text-base bg-[#7B00FF] rounded-lg"
          >
            Submit Amenities
          </Button>
        </form>
      </Form>
    </Card>
  );
}
