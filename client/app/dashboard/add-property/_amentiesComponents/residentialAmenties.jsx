import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ResidentialAmenties = ({ form }) => {
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
                  { key: "maintenanceStaff", label: "Maintenance Staff" },
                  { key: "vastuCompliant", label: "Vaastu Compliant" },
                  {
                    key: "securityFireAlarm",
                    label: "Security / Fire Alarm",
                  },
                  { key: "visitorParking", label: "Visitor Parking" },
                  { key: "gasLine", label: "Gas Line" },
                  { key: "wifiCable", label: "Wi-Fi/Cable" },
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

      {/* Other Features */}
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
                    key: "separateEntryForServantRoom",
                    label: "Separate entry for servant room",
                  },
                  {
                    key: "noOpenDrainageAround",
                    label: "No open drainage around",
                  },
                  { key: "petFriendly", label: "Pet-Friendly" },
                  {
                    key: "wheelchairFriendly",
                    label: "Wheelchair friendly",
                  },
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
                  {
                    key: "childrensPlayArea",
                    label: "Children's Play Area",
                  },
                  { key: "sportsFacilities", label: "Sports Facilities" },
                  {
                    key: "joggingWalkingTracks",
                    label: "Jogging/Walking Tracks",
                  },
                  { key: "gardenParks", label: "Garden/Parks" },
                  { key: "communityHalls", label: "Community Halls" },
                  { key: "cinemaRoom", label: "Cinema Room" },
                  {
                    key: "libraryReadingRoom",
                    label: "Library/Reading Room",
                  },
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

export default ResidentialAmenties;
