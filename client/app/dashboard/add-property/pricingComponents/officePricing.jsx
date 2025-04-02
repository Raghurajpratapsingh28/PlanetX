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

const OfficePricingForm = ({ form }) => {
  const { watch, setValue } = form;
  const rentalOption = watch("rentalOption");

  return (
    <>
      {/* Price Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold">Price</h3>
        <FormField
          control={form.control}
          name="price.amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter price amount"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price.currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                {/* Currency is fixed to INR */}
                <Input type="text" disabled {...field} value="INR" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Maintenance Charges Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold">Maintenance Charges</h3>
        <FormField
          control={form.control}
          name="maintenanceCharges.amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maintenance Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter maintenance amount"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maintenanceCharges.currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Input type="text" disabled {...field} value="INR" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maintenanceCharges.frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <FormControl>
                <Input type="text" disabled {...field} value="Monthly" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Rental Details Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold">Rental Details</h3>
        {/* Toggle Buttons for Rental Option */}
        <div className="flex space-x-2">
          <Button
            type="button"
            variant={rentalOption === "hourly" ? "solid" : "outline"}
            onClick={() => setValue("rentalOption", "hourly")}
            className={`${
              rentalOption === "hourly"
                ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                : "border-[#E1E1E1] text-[#6C696A]"
            }`}
          >
            Hourly Rent
          </Button>
          <Button
            type="button"
            variant={rentalOption === "monthly" ? "solid" : "outline"}
            onClick={() => setValue("rentalOption", "monthly")}
            className={`${
              rentalOption === "monthly"
                ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                : "border-[#E1E1E1] text-[#6C696A]"
            }`}
          >
            Monthly Rent
          </Button>
          <Button
            type="button"
            variant={rentalOption === "none" ? "solid" : "outline"}
            onClick={() => setValue("rentalOption", "none")}
            className={`${
              rentalOption === "none"
                ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                : "border-[#E1E1E1] text-[#6C696A]"
            }`}
          >
            None
          </Button>
        </div>

        {/* Conditionally render based on the selected rental option */}
        {rentalOption === "hourly" && (
          <FormField
            control={form.control}
            name="rentalDetails.hourlyRent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hourly Rent</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter hourly rent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {rentalOption === "monthly" && (
          <>
            <FormField
              control={form.control}
              name="rentalDetails.monthlyRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Rent</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter monthly rent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rentalDetails.securityDeposit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Security Deposit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter security deposit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </div>
    </>
  );
};

export default OfficePricingForm;
