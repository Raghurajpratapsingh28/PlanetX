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

const PGAmenities = ({ form }) => {
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
                  { key: "housekeeping", label: "Housekeeping" },
                  { key: "laundry", label: "Laundry" },
                  { key: "powerBackup", label: "Power Backup" },
                  { key: "security24x7", label: "24/7 Security" },
                  { key: "commonRefrigerator", label: "Common Refrigerator" },
                  { key: "ROWater", label: "RO Water" },
                  { key: "cookingAllowed", label: "Cooking Allowed" },
                  { key: "twoWheelerParking", label: "Two Wheeler Parking" },
                  { key: "fourWheelerParking", label: "Four Wheeler Parking" },
                  { key: "airConditioning", label: "Air Conditioning" },
                  { key: "geyser", label: "Geyser" },
                  { key: "lift", label: "Lift" },
                  { key: "gym", label: "Gym" },
                  { key: "swimmingPool", label: "Swimming Pool" },
                  { key: "studyTable", label: "Study Table" },
                  { key: "wardrobe", label: "Wardrobe" },
                  { key: "TV", label: "TV" },
                  { key: "microwave", label: "Microwave" },
                  { key: "recreationRoom", label: "Recreation Room" },
                  { key: "hotWater", label: "Hot Water" },
                  { key: "readingRoom", label: "Reading Room" },
                  { key: "garden", label: "Garden" },
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
                <div className="flex gap-5 items-center">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="entryTime"
                      className="text-sm font-medium text-gray-700"
                    >
                      Entry Time
                    </label>
                    <Input
                      id="entryTime"
                      type="time"
                      value={field.value?.timings?.entry || ""}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          timings: {
                            ...field.value?.timings,
                            entry: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="exitTime"
                      className="text-sm font-medium text-gray-700"
                    >
                      Exit Time
                    </label>
                    <Input
                      id="exitTime"
                      type="time"
                      value={field.value?.timings?.exit || ""}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          timings: {
                            ...field.value?.timings,
                            exit: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <Select
                  value={field.value?.guestPolicy || ""}
                  onValueChange={(value) =>
                    field.onChange({
                      ...field.value,
                      guestPolicy: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Guest Policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Allowed">Allowed</SelectItem>
                    <SelectItem value="Not Allowed">Not Allowed</SelectItem>
                    <SelectItem value="With Restrictions">
                      With Restrictions
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "smokingAllowed", label: "Smoking Allowed" },
                    { key: "alcoholAllowed", label: "Alcohol Allowed" },
                    { key: "petsAllowed", label: "Pets Allowed" },
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

      {/* Other Features */}
      <FormField
        control={form.control}
        name="otherFeatures"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium text-[#0F0D0D]">
              Other Features
            </FormLabel>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    key: "separateEntryForRooms",
                    label: "Separate Entry For Rooms",
                  },
                  {
                    key: "noOpenDrainageAround",
                    label: "No Open Drainage Around",
                  },
                  { key: "petFriendly", label: "Pet-Friendly" },
                  { key: "wheelChairFriendly", label: "Wheelchair Friendly" },
                  {
                    key: "rainWaterHarvesting",
                    label: "Rain Water Harvesting",
                  },
                  { key: "cornerProperty", label: "Corner Property" },
                ].map(({ key, label }) => (
                  <Button
                    type="button"
                    key={key}
                    variant="outline"
                    className={`h-[46px] text-base font-normal ${
                      (
                        key.includes(".")
                          ? field.value?.parking?.[key.split(".")[1]]
                          : field.value?.[key]
                      )
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

      {/* Society/Building Features */}
      <FormField
        control={form.control}
        name="societyBuildingFeatures"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium text-[#0F0D0D]">
              Society/Building Features
            </FormLabel>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "swimmingPool", label: "Swimming Pool" },
                  { key: "security24x7", label: "24/7 Security" },
                  { key: "gymFitnessCentre", label: "Gym/Fitness Centre" },
                  { key: "shoppingCenter", label: "Shopping Center" },
                  { key: "clubHouse", label: "Club House" },
                  { key: "childrenPlayArea", label: "Children's Play Area" },
                  { key: "sportsFacilities", label: "Sports Facilities" },
                  {
                    key: "joggingWalkingTracks",
                    label: "Jogging/Walking Tracks",
                  },
                  { key: "gardenParks", label: "Garden/Parks" },
                  { key: "communityHalls", label: "Community Halls" },
                  { key: "cinemaRoom", label: "Cinema Room" },
                  { key: "libraryReadingRoom", label: "Library/Reading Room" },
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

      {/* Nearby Places */}
      <FormField
        control={form.control}
        name="nearbyPlaces"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium text-[#0F0D0D]">
              Nearby Places
            </FormLabel>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "hospital", label: "Hospital" },
                  { key: "school", label: "School" },
                  { key: "metro", label: "Metro" },
                  { key: "mall", label: "Mall" },
                  { key: "market", label: "Market" },
                  { key: "railway", label: "Railway" },
                  { key: "airport", label: "Airport" },
                  { key: "highway", label: "Highway" },
                  { key: "busStation", label: "Bus Station" },
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
                        [key]: !field.value?.[key], // Toggle boolean value
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
    </>
  );
};

export default PGAmenities;
