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

const EventSpace = ({ form }) => {
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
                    <SelectItem value="Event Space">Event Space</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
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
                    <SelectItem value="Event Space">Event Space</SelectItem>
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
          name="propertyDetails.totalGuests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Total Guests Capacity
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Total Guests"
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

      <div className="space-y-4">
        <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
          Seating Arrangement Capacity
        </FormLabel>
        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="propertyDetails.seatingArrangement.theaterStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F0D0D] font-poppins">
                  Theater Style
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Theater Style Capacity"
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
            name="propertyDetails.seatingArrangement.classroomStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F0D0D] font-poppins">
                  Classroom Style
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Classroom Style Capacity"
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
            name="propertyDetails.seatingArrangement.banquetStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F0D0D] font-poppins">
                  Banquet Style
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Banquet Style Capacity"
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
            name="propertyDetails.seatingArrangement.conferenceStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0F0D0D] font-poppins">
                  Conference Style
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Conference Style Capacity"
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
      </div>
    </>
  );
};

export default EventSpace;
