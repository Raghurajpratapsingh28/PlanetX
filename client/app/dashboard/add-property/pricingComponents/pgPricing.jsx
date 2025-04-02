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

const PGPricingForm = ({ form }) => {
  return (
    <>
      {/* Pricing Section */}
      <div className="space-y-5">
        <h3 className="text-2xl font-semibold font-poppins text-[#0F0D0D]">
          PG Pricing Details
        </h3>
        <hr />
        <div className="flex justify-between gap-3">
          <FormField
            control={form.control}
            name="monthlyRent"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Monthly Rent
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter monthly rent"
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
            name="securityDeposit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Security Deposit
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter security deposit"
                    className="h-[50px] w-[350px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between gap-3">
          <FormField
            control={form.control}
            name="electricityCharges"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Electricity Charges
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter electricity charges"
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
            name="otherCharges"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Other Charges
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter other charges"
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
    </>
  );
};

export default PGPricingForm;
