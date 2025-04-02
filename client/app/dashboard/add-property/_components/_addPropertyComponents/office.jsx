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

const Office = ({ form }) => {
  return (
    <>
      {/* Basic Details */}
      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="subCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sub-Category</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sub-Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Office">Office</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertyDetails.propertyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Property Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Office Type & Transaction Type */}
      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.officeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Office Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Commercial Office">
                      Commercial Office
                    </SelectItem>
                    <SelectItem value="Co-Working Space">
                      Co-Working Space
                    </SelectItem>
                    <SelectItem value="Business Center">
                      Business Center
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="For Sale">For Sale</SelectItem>
                    <SelectItem value="For Rent">For Rent</SelectItem>
                    <SelectItem value="Hourly Basis">Hourly Basis</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Built-Up & Carpet Area */}
      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.builtUpArea.size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Built-Up Area (sq ft)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Built-Up Area"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    console.log(value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertyDetails.carpetArea.size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carpet Area (sq ft)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Carpet Area"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    console.log(value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Furnished Status */}
      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.furnishedStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Furnished Status</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Furnishing Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fully Furnished">
                      Fully Furnished
                    </SelectItem>
                    <SelectItem value="Semi-Furnished">
                      Semi-Furnished
                    </SelectItem>
                    <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Furnishing Details */}
      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.furnishingDetails.workstations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workstations</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Workstations"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    console.log(value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertyDetails.furnishingDetails.cabinRooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cabin Rooms</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Cabin Rooms"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    console.log(value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.furnishingDetails.meetingRooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting Rooms</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Meeting Rooms"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    console.log(value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertyDetails.furnishingDetails.conferenceRooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conference Rooms</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Conference Rooms"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    console.log(value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.furnishingDetails.pantry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pantry</FormLabel>
              <FormControl>
                <select
                  {...field}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  className="w-full h-[50px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertyDetails.furnishingDetails.cafeteria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cafeteria</FormLabel>
              <FormControl>
                <select
                  {...field}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  className="w-full h-[50px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.furnishingDetails.serverRoom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Server Room</FormLabel>
              <FormControl>
                <select
                  {...field}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  className="w-full h-[50px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertyDetails.furnishingDetails.airConditioning"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Air Conditioning</FormLabel>
              <FormControl>
                <select
                  {...field}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  className="w-full h-[50px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Floor Details */}
      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.floorDetails.totalFloors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Floors</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Total Floors"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertyDetails.floorDetails.officeOnFloor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office On Floor</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Office On Floor"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    console.log(value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default Office;
