"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import ResidentialPricingForm from "../pricingComponents/residentialPricing";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { residentialDefaultPriceSchema } from "../pricingComponents/schema/residentialPriceSchema";
import { residentialDefaultPriceDefaults } from "../pricingComponents/default/residentialPriceDefault";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { pgPricingSchema } from "../pricingComponents/schema/pgPricingSchema";
import { pgPricingDefaultValues } from "../pricingComponents/default/pgPricingDefault";
import PGPricingForm from "../pricingComponents/pgPricing";
import HotelPricingForm from "../pricingComponents/hotelPricing";
import { hotelPricingDefaultValues } from "../pricingComponents/default/hotelPricingDefault";
import { hotelPricingSchema } from "../pricingComponents/schema/hotelPricingSchema";
import OfficePricingForm from "../pricingComponents/officePricing";
import { officePricingDefaultValues } from "../pricingComponents/default/officePricingDefault";
import { officePricingSchema } from "../pricingComponents/schema/officePricingSchema";
import { useToast } from "@/hooks/use-toast";

export default function AddPrice({
  propertyData,
  setPropertyData,
  setCurrentStep,
}) {
  const searchParams = useSearchParams();
  const propertyKind = searchParams.get("propertyKind");
  const { toast } = useToast();
  const combinedPricing =
    propertyKind === "Office" ||
    propertyKind === "Warehouse" ||
    propertyKind === "Shop" ||
    propertyKind === "Shared Warehouse" ||
    propertyKind === "EventSpace";
  const schema =
    propertyKind === "Residential"
      ? residentialDefaultPriceSchema
      : propertyKind === "Pg"
      ? pgPricingSchema
      : propertyKind === "Hotel"
      ? hotelPricingSchema
      : combinedPricing
      ? officePricingSchema
      : "";
  const defaults =
    propertyKind === "Residential"
      ? residentialDefaultPriceDefaults
      : propertyKind === "Pg"
      ? pgPricingDefaultValues
      : propertyKind === "Hotel"
      ? hotelPricingDefaultValues
      : combinedPricing
      ? officePricingDefaultValues
      : "";

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });
  const onSubmit = (values) => {
    console.log("Form data", values);
    try {
      setPropertyData((prevPropertyData) => ({
        ...prevPropertyData,
        pricing: {
          ...values,
        },
      }));

      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-8 bg-white p-12 rounded-lg w-[55vw]">
          {propertyKind === "Residential" ? (
            <ResidentialPricingForm form={form} />
          ) : propertyKind === "Pg" ? (
            <PGPricingForm form={form} />
          ) : propertyKind === "Hotel" ? (
            <HotelPricingForm form={form} />
          ) : propertyKind === "Office" ||
            propertyKind === "Warehouse" ||
            propertyKind === "Shop" ||
            propertyKind === "Shared Warehouse" ||
            propertyKind === "EventSpace" ? (
            <OfficePricingForm form={form} />
          ) : (
            <></>
          )}
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="w-[50%] h-[50px] text-base bg-[#7B00FF] rounded-lg"
            >
              Submit Price
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
