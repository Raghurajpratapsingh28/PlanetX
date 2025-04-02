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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Warehouse = ({ form }) => {
  return (
    <div className="space-y-8">
      {/* Amenities Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Amenities</h3>

        {/* Other Amenities as Toggle Buttons */}
        <div className="grid grid-cols-5 gap-2">
          {Object.entries({
            visitorParking: "Visitor Parking",
            powerBackup: "Power Backup",
            security24x7: "24/7 Security",
            cctv: "CCTV",
            fireSafety: "Fire Safety",
            wifi: "Wi-Fi",
            elevator: "Elevator",
            maintenanceStaff: "Maintenance Staff",
            loadingDock: "Loading Dock",
            coldStorageFacility: "Cold Storage",
          }).map(([key, label]) => (
            <FormField
              key={key}
              control={form.control}
              name={`amenities.${key}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      className={`h-[46px] w-full text-base font-normal ${
                        field.value
                          ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                          : "border-[#E1E1E1] text-[#6C696A]"
                      }`}
                      onClick={() => field.onChange(!field.value)}
                    >
                      {label}
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <h2 className="text-lg font-semibold">Parking Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="amenities.parking.covered"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    className={`h-[46px] w-full text-base font-normal ${
                      field.value
                        ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                        : "border-[#E1E1E1] text-[#6C696A]"
                    }`}
                    onClick={() => field.onChange(!field.value)}
                  >
                    Covered Parking
                  </Button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amenities.parking.open"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    className={`h-[46px] w-full text-base font-normal ${
                      field.value
                        ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                        : "border-[#E1E1E1] text-[#6C696A]"
                    }`}
                    onClick={() => field.onChange(!field.value)}
                  >
                    Open Parking
                  </Button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Warehouse Features Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Warehouse Features</h3>

        {/* Entry Type, Shutter Type, Ventilation */}
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="warehouseFeatures.entryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entry Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entry type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Single Entry", "Multiple Entry"].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="warehouseFeatures.shutterType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shutter Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shutter type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Manual", "Automatic"].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="warehouseFeatures.ventilation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ventilation</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ventilation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Natural", "Mechanical"].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Power Supply */}
        <div className="grid grid-cols-2 gap-4">
          {/* Since the power supply type is fixed to "3-Phase", we only take capacity */}
          <FormField
            control={form.control}
            name="warehouseFeatures.powerSupply.capacity.value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Power Capacity</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Capacity"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <span className="self-center">kVA</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Water Supply Toggle */}
          <FormField
            control={form.control}
            name="warehouseFeatures.waterSupply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Water Supply</FormLabel>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    className={`h-[46px] w-full text-base font-normal ${
                      field.value
                        ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                        : "border-[#E1E1E1] text-[#6C696A]"
                    }`}
                    onClick={() => field.onChange(!field.value)}
                  >
                    {field.value ? "Yes" : "No"}
                  </Button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Flooring and Additional Warehouse Features */}
        <div className="flex flex-col flex-wrap gap-4">
          <FormField
            control={form.control}
            name="warehouseFeatures.flooringType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flooring Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select flooring type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Concrete", "Epoxy", "Paved"].map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5">
            {Object.entries({
              hazardousMaterialStorage: "Hazardous Material Storage",
              temperatureControlled: "Temperature Controlled",
              fireSprinklerSystem: "Fire Sprinkler System",
            }).map(([key, label]) => (
              <FormField
                key={key}
                control={form.control}
                name={`warehouseFeatures.${key}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={`h-[46px] w-full text-base font-normal ${
                          field.value
                            ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                            : "border-[#E1E1E1] text-[#6C696A]"
                        }`}
                        onClick={() => field.onChange(!field.value)}
                      >
                        {label}
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Additional Details</h3>

        {/* Nearby Places */}
        <div className="space-y-2">
          <h4 className="text-md font-medium">Nearby Places</h4>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries({
              hospital: "Hospital",
              school: "School",
              metro: "Metro",
              mall: "Mall",
              market: "Market",
              railway: "Railway",
              airport: "Airport",
              highway: "Highway",
              busStation: "Bus Station",
            }).map(([key, label]) => (
              <FormField
                key={key}
                control={form.control}
                name={`additionalDetails.nearbyPlaces.${key}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={`h-[46px] w-full text-base font-normal ${
                          field.value
                            ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                            : "border-[#E1E1E1] text-[#6C696A]"
                        }`}
                        onClick={() => field.onChange(!field.value)}
                      >
                        {label}
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* Compliance Certificates */}
        <div className="space-y-2">
          <h4 className="text-md font-medium">Compliance Certificates</h4>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries({
              fireSafetyCertificate: "Fire Safety Certificate",
              buildingStabilityCertificate: "Building Stability Certificate",
              environmentalClearance: "Environmental Clearance",
            }).map(([key, label]) => (
              <FormField
                key={key}
                control={form.control}
                name={`additionalDetails.complianceCertificates.${key}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={`h-[46px] w-full text-base font-normal ${
                          field.value
                            ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                            : "border-[#E1E1E1] text-[#6C696A]"
                        }`}
                        onClick={() => field.onChange(!field.value)}
                      >
                        {label}
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="space-y-4">
          <h4 className="text-md font-medium">Rules</h4>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="additionalDetails.rules.operatingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operating Hours</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="e.g., 8 AM - 8 PM"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalDetails.rules.quietHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quiet Hours</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="e.g., 10 PM - 6 AM"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {Object.entries({
              petFriendly: "Pet Friendly",
              smokingAllowed: "Smoking Allowed",
              alcoholAllowed: "Alcohol Allowed",
            }).map(([key, label]) => (
              <FormField
                key={key}
                control={form.control}
                name={`additionalDetails.rules.${key}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        className={`h-[46px] w-full text-base font-normal ${
                          field.value
                            ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                            : "border-[#E1E1E1] text-[#6C696A]"
                        }`}
                        onClick={() => field.onChange(!field.value)}
                      >
                        {label}
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          {/* Hourly Availability */}
          <FormField
            control={form.control}
            name="additionalDetails.rules.hourlyAvailability.available"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hourly Booking Available</FormLabel>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    className={`h-[46px] w-full text-base font-normal ${
                      field.value
                        ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                        : "border-[#E1E1E1] text-[#6C696A]"
                    }`}
                    onClick={() => field.onChange(!field.value)}
                  >
                    {field.value ? "Yes" : "No"}
                  </Button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch(
            "additionalDetails.rules.hourlyAvailability.available"
          ) && (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="additionalDetails.rules.hourlyAvailability.timings.start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalDetails.rules.hourlyAvailability.timings.end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Warehouse;
