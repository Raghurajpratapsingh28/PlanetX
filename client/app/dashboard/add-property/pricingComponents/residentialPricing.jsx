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
    <div className="space-y-6">
      {/* Pricing Section */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
          Pricing Details
        </h3>
        <hr className="border-gray-200" />
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <FormField
            control={form.control}
            name="expectedPrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm sm:text-base font-medium text-gray-700">
                  Expected Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter expected price"
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base text-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="PricePerSqft"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-sm sm:text-base font-medium text-gray-700">
                  Price per Sqft
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price per sqft"
                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base text-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs sm:text-sm text-red-500" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Maintenance Section */}
      <div className="space-y-4">
        <h3 className="text-md sm:text-lg md:text-xl font-semibold text-gray-800">
          Maintenance
        </h3>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
          <FormField
            control={form.control}
            name="maintenanceFrequency"
            render={({ field }) => (
              <FormItem className="w-full sm:w-40">
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full h-10 sm:h-12 border-gray-300 text-sm sm:text-base text-gray-600 focus:ring-2 focus:ring-purple-500">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs sm:text-sm text-red-500" />
              </FormItem>
            )}
          />

          {maintenanceFrequency && (
            <FormField
              control={form.control}
              name="maintenancePrice"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter maintenance price"
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-md text-sm sm:text-base text-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent sm:border-l sm:rounded-l-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm text-red-500" />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResidentialPricingForm;