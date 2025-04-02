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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const SharedWarehouseForm = ({ form }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.workspaceName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Workspace Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Workspace Name"
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
                    <SelectItem value="Shared Workspace">
                      Shared Workspace
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
          name="propertyDetails.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Type
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="focus:outline-none focus:ring-0 focus:border-transparent h-[50px]">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hot Desk">Hot Desk</SelectItem>
                    <SelectItem value="Dedicated Desk">
                      Dedicated Desk
                    </SelectItem>
                    <SelectItem value="Private Office">
                      Private Office
                    </SelectItem>
                    <SelectItem value="Meeting Room">Meeting Room</SelectItem>
                    <SelectItem value="Conference Room">
                      Conference Room
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.capacity.totalSeats"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Total Seats
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Total Seats"
                  className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="propertyDetails.capacity.availableSeats"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Available Seats
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Available Seats"
                  className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default SharedWarehouseForm;
