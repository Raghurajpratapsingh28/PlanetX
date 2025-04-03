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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ResidentialPricingForm = ({ form }) => {
  const maintenanceFrequency = form.watch("maintenanceFrequency");

  return (
    <>
      {/* Pricing Section */}
      <div className="space-y-5">
        <h3 className="text-2xl font-semibold font-poppins text-[#0F0D0D]">
          Pricing Detail
        </h3>
        <hr />
        <div className="flex justify-between  gap-3">
          <FormField
            control={form.control}
            name="expectedPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Expected Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter expected price"
                    className="h-[50px] w-[350px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="PricePerSqft"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Price per Sqft
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price per sqft"
                    className="h-[50px] w-[350px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Maintenance Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Maintenance
        </h3>
        <div className="flex gap-2 items-center">
          <FormField
            control={form.control}
            name="maintenanceFrequency"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[150px] h-[48px]">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {maintenanceFrequency && (
            <FormField
              control={form.control}
              name="maintenancePrice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter maintenance price"
                      className="h-[50px] w-[300px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins !border-l-0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ResidentialPricingForm;
