import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OfficeAmenities = ({ form }) => {
  return (
    <>
      {/* Amenities */}
      <FormField
        control={form.control}
        name="amenities"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium text-[#0F0D0D]">
              Amenities
            </FormLabel>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "wifi", label: "Wi-Fi" },
                  { key: "powerBackup", label: "Power Backup" },
                  { key: "security24x7", label: "24/7 Security" },
                  { key: "cctv", label: "CCTV" },
                  { key: "lift", label: "Lift" },
                  { key: "parking.covered", label: "Covered Parking" },
                  { key: "parking.open", label: "Open Parking" },
                  { key: "fireSafety", label: "Fire Safety" },
                  { key: "housekeeping", label: "Housekeeping" },
                  { key: "visitorParking", label: "Visitor Parking" },
                  { key: "pantry", label: "Pantry" },
                  { key: "cafeteria", label: "Cafeteria" },
                  { key: "receptionService", label: "Reception Service" },
                  { key: "gymFitnessCentre", label: "Gym/Fitness Centre" },
                  { key: "breakoutArea", label: "Breakout Area" },
                ].map(({ key, label }) => (
                  <Button
                    type="button"
                    key={key}
                    variant="outline"
                    className={`h-[46px] text-base font-normal ${
                      field.value?.[key]
                        ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                        : "border-[#E1E1E1] text-[#6C696A]"
                    }`}
                    onClick={() =>
                      field.onChange({
                        ...field.value,
                        [key]: !field.value?.[key],
                      })
                    }
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </FormControl>
            <FormMessage className="text-red-500 text-sm" />
          </FormItem>
        )}
      />

      {/* Building Features */}
      <FormField
        control={form.control}
        name="buildingFeatures"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium text-[#0F0D0D]">
              Building Features
            </FormLabel>
            <FormControl>
              <div className="space-y-4">
                <Select
                  value={field.value?.buildingType || ""}
                  onValueChange={(value) =>
                    field.onChange({ ...field.value, buildingType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Building Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standalone Building">
                      Standalone Building
                    </SelectItem>
                    <SelectItem value="IT Park">IT Park</SelectItem>
                    <SelectItem value="Commercial Complex">
                      Commercial Complex
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={field.value?.grade || ""}
                  onValueChange={(value) =>
                    field.onChange({ ...field.value, grade: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grade A">Grade A</SelectItem>
                    <SelectItem value="Grade B">Grade B</SelectItem>
                    <SelectItem value="Grade C">Grade C</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      key: "fireSafetyCompliance",
                      label: "Fire Safety Compliance",
                    },
                    {
                      key: "wheelChairAccessibility",
                      label: "Wheelchair Accessibility",
                    },
                    {
                      key: "greenBuildingCertification",
                      label: "Green Building Certification",
                    },
                    {
                      key: "rainWaterHarvesting",
                      label: "Rain Water Harvesting",
                    },
                    { key: "wasteManagement", label: "Waste Management" },
                  ].map(({ key, label }) => (
                    <Button
                      type="button"
                      key={key}
                      variant="outline"
                      className={`h-[46px] text-base font-normal ${
                        field.value?.[key]
                          ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                          : "border-[#E1E1E1] text-[#6C696A]"
                      }`}
                      onClick={() =>
                        field.onChange({
                          ...field.value,
                          [key]: !field.value?.[key],
                        })
                      }
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </FormControl>
            <FormMessage className="text-red-500 text-sm" />
          </FormItem>
        )}
      />

      {/* Room Details */}
      <FormField
        control={form.control}
        name="roomDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium text-[#0F0D0D]">
              Room Details
            </FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div className="flex gap-5 items-center">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Total Cabins
                    </label>
                    <Input
                      type="number"
                      value={field.value?.totalCabins}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          totalCabins: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Workstations
                    </label>
                    <Input
                      type="number"
                      value={field.value?.workstations}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          workstations: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Meeting Rooms
                    </label>
                    <Input
                      type="number"
                      value={field.value?.meetingRooms}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          meetingRooms: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Conference Rooms
                    </label>
                    <Input
                      type="number"
                      value={field.value?.conferenceRooms}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          conferenceRooms: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <Select
                  value={field.value?.pantryType}
                  onValueChange={(value) =>
                    field.onChange({ ...field.value, pantryType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pantry Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dry">Dry</SelectItem>
                    <SelectItem value="Wet">Wet</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-5 items-center">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Common Area Size (sq ft)
                    </label>
                    <Input
                      type="number"
                      value={field.value?.commonArea?.size}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          commonArea: {
                            ...field.value?.commonArea,
                            size: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </FormControl>
            <FormMessage className="text-red-500 text-sm" />
          </FormItem>
        )}
      />
      {/* Additional Features */}
      <FormField
        control={form.control}
        name="additionalFeatures"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium text-[#0F0D0D]">
              Additional Features
            </FormLabel>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "petFriendly", label: "Pet Friendly" },
                  { key: "coupleFriendly", label: "Couple Friendly" },
                  { key: "childFriendly", label: "Child Friendly" },
                  { key: "localIDAccepted", label: "Local ID Accepted" },
                  { key: "alcoholAllowed", label: "Alcohol Allowed" },
                ].map(({ key, label }) => (
                  <Button
                    type="button"
                    key={key}
                    variant="outline"
                    className={`h-[46px] text-base font-normal ${
                      field.value?.[key]
                        ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                        : "border-[#E1E1E1] text-[#6C696A]"
                    }`}
                    onClick={() =>
                      field.onChange({
                        ...field.value,
                        [key]: !field.value?.[key],
                      })
                    }
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </FormControl>
            <FormMessage className="text-red-500 text-sm" />

            <div className="mt-4">
              <FormLabel className="text-base font-medium text-[#0F0D0D]">
                Visitor Entry Policy
              </FormLabel>
              <FormControl>
                <Input
                  value={field.value?.visitorEntryPolicy || ""}
                  onChange={(e) =>
                    field.onChange({
                      ...field.value,
                      visitorEntryPolicy: e.target.value,
                    })
                  }
                  placeholder="Visitor Entry Policy"
                />
              </FormControl>
            </div>
          </FormItem>
        )}
      />
      {/* Rules */}
      <FormField
        control={form.control}
        name="rules"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium text-[#0F0D0D]">
              Rules
            </FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Operating Hours *
                  </FormLabel>
                  <Input
                    value={field.value?.operatingHours || ""}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        operatingHours: e.target.value,
                      })
                    }
                    placeholder="Operating Hours"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "smokingAllowed", label: "Smoking Allowed" },
                    { key: "alcoholAllowed", label: "Alcohol Allowed" },
                  ].map(({ key, label }) => (
                    <Button
                      type="button"
                      key={key}
                      variant="outline"
                      className={`h-[46px] text-base font-normal ${
                        field.value?.[key]
                          ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                          : "border-[#E1E1E1] text-[#6C696A]"
                      }`}
                      onClick={() =>
                        field.onChange({
                          ...field.value,
                          [key]: !field.value?.[key],
                        })
                      }
                    >
                      {label}
                    </Button>
                  ))}
                </div>

                <div>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Quiet Hours
                  </FormLabel>
                  <Input
                    value={field.value?.quietHours || ""}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        quietHours: e.target.value,
                      })
                    }
                    placeholder="Quiet Hours"
                  />
                </div>

                <div className="space-y-2">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Hourly Availability
                  </FormLabel>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className={`h-[46px] text-base font-normal ${
                        field.value?.hourlyAvailability?.available
                          ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                          : "border-[#E1E1E1] text-[#6C696A]"
                      }`}
                      onClick={() =>
                        field.onChange({
                          ...field.value,
                          hourlyAvailability: {
                            ...field.value?.hourlyAvailability,
                            available:
                              !field.value?.hourlyAvailability?.available,
                          },
                        })
                      }
                    >
                      Available
                    </Button>
                  </div>
                  <div className="flex gap-5 items-center">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        Start Time
                      </label>
                      <Input
                        value={
                          field.value?.hourlyAvailability?.timings?.start || ""
                        }
                        onChange={(e) =>
                          field.onChange({
                            ...field.value,
                            hourlyAvailability: {
                              ...field.value?.hourlyAvailability,
                              timings: {
                                ...field.value?.hourlyAvailability?.timings,
                                start: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="Start Time"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700">
                        End Time
                      </label>
                      <Input
                        value={
                          field.value?.hourlyAvailability?.timings?.end || ""
                        }
                        onChange={(e) =>
                          field.onChange({
                            ...field.value,
                            hourlyAvailability: {
                              ...field.value?.hourlyAvailability,
                              timings: {
                                ...field.value?.hourlyAvailability?.timings,
                                end: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="End Time"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FormControl>
            <FormMessage className="text-red-500 text-sm" />
          </FormItem>
        )}
      />
    </>
  );
};

export default OfficeAmenities;
