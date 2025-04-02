"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HotelPricingForm = ({ form }) => {
  const { watch, setValue } = form;
  const basePricePerNight = watch("basePricePerNight");
  const discountedPrice = watch("discountedPrice");
  const taxes = watch("taxes");

  useEffect(() => {
    const finalPrice =
      Number(basePricePerNight) - Number(discountedPrice) + Number(taxes);
    setValue("finalPrice", finalPrice);
  }, [basePricePerNight, discountedPrice, taxes, setValue]);

  return (
    <>
      <div className="space-y-5">
        <h3 className="text-xl font-semibold">Hotel Pricing</h3>
        <FormField
          control={form.control}
          name="basePricePerNight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Price Per Night</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter base price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discountedPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discounted Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter discounted price (if any)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taxes</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter taxes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="finalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Final Price</FormLabel>
              <FormControl>
                <Input type="number" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default HotelPricingForm;
