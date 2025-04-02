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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SelectButton from "../selectButton";
import { useState } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Pg = ({ form }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-5">
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
                    <SelectItem value="Boys PG">Boys PG</SelectItem>
                    <SelectItem value="Girls PG">Girls PG</SelectItem>
                    <SelectItem value="Co-ed PG">Co-ed PG</SelectItem>
                    <SelectItem value="Couples PG">Couples PG</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roomDetails.sharingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Sharing Type
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="focus:outline-none focus:ring-0 focus:border-transparent h-[49px]">
                    <SelectValue placeholder="Select Sharing Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single Sharing">
                      Single Sharing
                    </SelectItem>
                    <SelectItem value="Double Sharing">
                      Double Sharing
                    </SelectItem>
                    <SelectItem value="Triple Sharing">
                      Triple Sharing
                    </SelectItem>
                    <SelectItem value="Quad Sharing">Quad Sharing</SelectItem>
                    <SelectItem value="Dormitory">Dormitory</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roomDetails.bedCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Bed Count
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Number of Beds"
                  className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="roomDetails.attachedBathroom"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Attached Bathroom
              </FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roomDetails.balcony"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Balcony
              </FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={form.control}
          name="roomDetails.roomSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Room Size
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Room Size (e.g., 10x12)"
                  className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2.5">
        <FormField
          control={form.control}
          name="mealDetails.mealIncluded"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base mt-10 font-medium font-poppins text-[#0F0D0D]">
                Meal Included
              </FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mealDetails.mealType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Meal Type
              </FormLabel>
              <FormControl>
                <SelectButton
                  options={["Vegetarian", "Non-Vegetarian", "Both"]}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mealDetails.mealFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Meal Frequency
              </FormLabel>
              <FormControl>
                <SelectButton
                  options={["Breakfast", "Lunch", "Dinner"]}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mealDetails.customizationAllowed"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Customization Allowed
              </FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full h-[58px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default Pg;
