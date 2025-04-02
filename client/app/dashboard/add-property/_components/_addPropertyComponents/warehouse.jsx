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

const Warehouse = ({ form }) => {
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
                    <SelectItem value="Warehouse/Storage">
                      Warehouse/Storage
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
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Transaction Type
              </FormLabel>
              <FormControl>
                <Select
                  multiple
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="focus:outline-none focus:ring-0 focus:border-transparent h-[50px]">
                    <SelectValue placeholder="Select Transaction Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="For Sale">For Sale</SelectItem>
                    <SelectItem value="For Rent">For Rent</SelectItem>
                    <SelectItem value="Hourly Basis">Hourly Basis</SelectItem>
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
          name="propertyDetails.propertyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Property Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Property Name"
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
          name="propertyDetails.warehouseType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Warehouse Type
              </FormLabel>
              <FormControl>
                <Select
                  multiple
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="focus:outline-none focus:ring-0 focus:border-transparent h-[50px]">
                    <SelectValue placeholder="Select Warehouse Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Standalone Warehouse",
                      "Shared Space",
                      "Cold Storage",
                      "Container Yard",
                      "Logistics Hub",
                    ].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        {["builtUpArea", "carpetArea"].map((areaType) => (
          <FormField
            key={areaType}
            control={form.control}
            name={`propertyDetails.${areaType}.size`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  {areaType === "builtUpArea" ? "Built-Up Area" : "Carpet Area"}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Size"
                      className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins flex-1"
                      {...field}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        field.onChange(value);
                      }}
                    />
                    <span className="text-[#9E9E9E]">sq ft</span>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.furnishedStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Furnished Status
              </FormLabel>
              <FormControl>
                <Select
                  multiple
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="focus:outline-none focus:ring-0 focus:border-transparent h-[50px]">
                    <SelectValue placeholder="Select Furnished Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Unfurnished", "Semi-Furnished", "Fully Furnished"].map(
                      (status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="propertyDetails.floorDetails.totalFloors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Total Floors
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Total Floors"
                    className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="propertyDetails.floorDetails.propertyOnFloor"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Property Floor
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Property Floor"
                    className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                    {...field}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {["floorLoadCapacity", "clearHeight"].map((fieldType) => (
          <FormField
            key={fieldType}
            control={form.control}
            name={`propertyDetails.${fieldType}.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  {fieldType === "floorLoadCapacity"
                    ? "Floor Load Capacity"
                    : "Clear Height"}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Value"
                      className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins flex-1"
                      {...field}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        field.onChange(value);
                      }}
                    />
                    <span className="text-[#9E9E9E]">
                      {fieldType === "floorLoadCapacity" ? "kg/sq ft" : "ft"}
                    </span>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="propertyDetails.dockDoors"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Dock Doors
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Number of Dock Doors"
                  className="h-[58px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                  {...field}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="propertyDetails.rampAccess"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                Ramp Access
              </FormLabel>
              <FormControl>
                <select
                  {...field}
                  value={field.value ? "true" : "false"}
                  onChange={(e) => field.onChange(e.target.value === "true")}
                  className="w-full h-[50px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
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

export default Warehouse;
