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

const Shop = ({ form }) => {
  return (
    <>
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
                    <SelectItem value="Retail/Shop">Retail/Shop</SelectItem>
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

      {/* Shop Type & Transaction Type */}
      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.shopType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop Type</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  multiple
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Shop Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standalone Shop">
                      Standalone Shop
                    </SelectItem>
                    <SelectItem value="Shopping Mall Unit">
                      Shopping Mall Unit
                    </SelectItem>
                    <SelectItem value="High-Street Retail">
                      High-Street Retail
                    </SelectItem>
                    <SelectItem value="Kiosk">Kiosk</SelectItem>
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

      {/* Area Details */}
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
                    <SelectValue placeholder="Select Furnished Status" />
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
          name="propertyDetails.furnishingDetails.shelves"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shelves</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Shelves"
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
          name="propertyDetails.furnishingDetails.displayRacks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Racks</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Display Racks"
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
      </div>
      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.furnishingDetails.cashCounter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cash Counter</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Cash Counter"
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
                  <option value="true">Yes</option>
                  <option value="false">No</option>
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
          name="propertyDetails.furnishingDetails.cctvCameras"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CCTV Cameras</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="CCTV Cameras"
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
          name="propertyDetails.furnishingDetails.powerBackup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Power Backup</FormLabel>
              <FormControl>
                <select
                  {...field}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  className="w-full h-[50px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
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
          name="propertyDetails.furnishingDetails.washroom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Washroom</FormLabel>
              <FormControl>
                <select
                  {...field}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  className="w-full h-[50px] px-[15px] border border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  <option value="true">Yes</option>
                  <option value="false">No</option>
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
          name="propertyDetails.floorDetails.shopOnFloor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop On Floor</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Shop On Floor"
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
      </div>
    </>
  );
};

export default Shop;
