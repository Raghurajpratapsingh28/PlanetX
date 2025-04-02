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

const Shop = ({ form }) => {
  return (
    <div className="space-y-6">
      {/* Amenities Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Amenities</h3>

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

      {/* Building Features Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Building Features</h3>
        <FormField
          control={form.control}
          name="buildingFeatures.buildingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Building Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select building type" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Standalone Building",
                    "Shopping Mall",
                    "Mixed-Use Complex",
                  ].map((option) => (
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

        <div className="grid grid-cols-4 gap-2">
          {Object.entries({
            fireSafetyCompliance: "Fire Safety Compliance",
            wheelChairAccessibility: "Wheelchair Access",
            greenBuildingCertification: "Green Certification",
            rainWaterHarvesting: "Rainwater Harvesting",
            wasteManagement: "Waste Management",
          }).map(([key, label]) => (
            <FormField
              key={key}
              control={form.control}
              name={`buildingFeatures.${key}`}
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

      {/* Shop Features Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Shop Features</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="shopFeatures.shopFrontage.length"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop Frontage Length</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>

                  <span className="self-center">ft</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shopFeatures.height.value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>

                  <span className="self-center">ft</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="shopFeatures.parkingAvailability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parking Availability</FormLabel>
              <div className="flex gap-2">
                {["Dedicated", "Public", "None"].map((option) => (
                  <Button
                    key={option}
                    type="button"
                    variant="outline"
                    className={`h-[46px] text-base font-normal ${
                      field.value?.includes(option)
                        ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                        : "border-[#E1E1E1] text-[#6C696A]"
                    }`}
                    onClick={() => {
                      const current = field.value || [];
                      field.onChange(
                        current.includes(option)
                          ? current.filter((v) => v !== option)
                          : [...current, option]
                      );
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="shopFeatures.waterSupply"
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
          <FormField
            control={form.control}
            name="shopFeatures.electricityLoad.value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Electricity Load</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>

                  <span className="self-center">kW</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="shopFeatures.shutterType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shutter Type</FormLabel>
              <div className="flex gap-2">
                {["Manual", "Automatic"].map((option) => (
                  <Button
                    key={option}
                    type="button"
                    variant="outline"
                    className={`h-[46px] text-base font-normal ${
                      field.value?.includes(option)
                        ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                        : "border-[#E1E1E1] text-[#6C696A]"
                    }`}
                    onClick={() => {
                      const current = field.value || [];
                      field.onChange(
                        current.includes(option)
                          ? current.filter((v) => v !== option)
                          : [...current, option]
                      );
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shopFeatures.advertisingSpace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Advertising Space</FormLabel>
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

      {/* Additional Features Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Additional Features</h3>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries({
            petFriendly: "Pet Friendly",
            childFriendly: "Child Friendly",
            localIDAccepted: "Local ID Accepted",
            alcoholAllowed: "Alcohol Allowed",
          }).map(([key, label]) => (
            <FormField
              key={key}
              control={form.control}
              name={`additionalFeatures.${key}`}
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

        <FormField
          control={form.control}
          name="additionalFeatures.visitorEntryPolicy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visitor Entry Policy</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe visitor entry policy..."
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Rules Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Rules</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="rules.operatingHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operating Hours</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    placeholder="e.g., 9 AM - 9 PM"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rules.quietHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quiet Hours</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    placeholder="e.g., 10 PM - 6 AM"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {Object.entries({
            smokingAllowed: "Smoking Allowed",
            alcoholAllowed: "Alcohol Allowed",
          }).map(([key, label]) => (
            <FormField
              key={key}
              control={form.control}
              name={`rules.${key}`}
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

        <FormField
          control={form.control}
          name="rules.hourlyAvailability.available"
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

        {form.watch("rules.hourlyAvailability.available") && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="rules.hourlyAvailability.timings.start"
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
              name="rules.hourlyAvailability.timings.end"
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

      {/* Nearby Places Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Nearby Places</h3>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries({
            hospital: "Hospital",
            school: "School",
            metro: "Metro Station",
            mall: "Shopping Mall",
            market: "Market",
            railway: "Railway Station",
            airport: "Airport",
            highway: "Highway",
            busStation: "Bus Station",
          }).map(([key, label]) => (
            <FormField
              key={key}
              control={form.control}
              name={`nearbyPlaces.${key}`}
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
  );
};

export default Shop;
