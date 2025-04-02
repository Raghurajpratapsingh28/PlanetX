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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const HotelAmentiesForm = ({ form }) => {
  return (
    <>
      {/* Amenities */}
      <FormField
        control={form.control}
        name="amenities"
        render={({ field }) => {
          const safeValue = field.value || {};
          return (
            <FormItem>
              <FormLabel className="text-base font-medium text-[#0F0D0D]">
                Amenities
              </FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "wifi", label: "Wi-Fi" },
                    { key: "powerBackup", label: "Power Backup" },
                    { key: "parking.twoWheeler", label: "Two Wheeler Parking" },
                    {
                      key: "parking.fourWheeler",
                      label: "Four Wheeler Parking",
                    },
                    { key: "hotWater", label: "Hot Water" },
                    { key: "laundryService", label: "Laundry Service" },
                    { key: "housekeeping", label: "Housekeeping" },
                    { key: "roomService", label: "Room Service" },
                    { key: "airConditioning", label: "Air Conditioning" },
                    { key: "restaurant", label: "Restaurant" },
                    { key: "bar", label: "Bar" },
                    { key: "conferenceRoom", label: "Conference Room" },
                    { key: "gym", label: "Gym" },
                    { key: "swimmingPool", label: "Swimming Pool" },
                    { key: "lift", label: "Lift" },
                    { key: "cctv", label: "CCTV" },
                    { key: "security24x7", label: "24/7 Security" },
                    { key: "firstAidKit", label: "First Aid Kit" },
                    { key: "fireExtinguisher", label: "Fire Extinguisher" },
                    { key: "wheelChairAccess", label: "Wheelchair Access" },
                  ].map(({ key, label }) => {
                    const isNested = key.includes(".");
                    const [parent, child] = isNested
                      ? key.split(".")
                      : [null, null];
                    // Use nullish coalescing to default undefined to false
                    const currentValue = isNested
                      ? safeValue[parent]?.[child] ?? false
                      : safeValue[key] ?? false;

                    const onClickHandler = () => {
                      const updatedValue = { ...safeValue };
                      if (isNested) {
                        updatedValue[parent] = {
                          ...(safeValue[parent] || {}),
                          [child]: !currentValue,
                        };
                      } else {
                        updatedValue[key] = !currentValue;
                      }
                      field.onChange(updatedValue);
                    };

                    return (
                      <Button
                        key={key}
                        type="button"
                        variant="outline"
                        className={`h-[46px] text-base font-normal ${
                          currentValue
                            ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                            : "border-[#E1E1E1] text-[#6C696A]"
                        }`}
                        onClick={onClickHandler}
                      >
                        {label}
                      </Button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          );
        }}
      />

      {/* Meal Options */}
      <FormField
        control={form.control}
        name="mealOptions"
        render={({ field }) => {
          const safeValue = field.value || {};
          return (
            <FormItem>
              <FormLabel className="text-base font-medium text-[#0F0D0D]">
                Meal Options
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {/* Included Meals */}
                  <div>
                    <Label className="block mb-2 text-sm font-medium">
                      Included Meals
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { key: "includedMeals.breakfast", label: "Breakfast" },
                        { key: "includedMeals.lunch", label: "Lunch" },
                        { key: "includedMeals.dinner", label: "Dinner" },
                      ].map(({ key, label }) => {
                        const isNested = key.includes(".");
                        const [parent, child] = key.split(".");
                        const currentValue = isNested
                          ? safeValue[parent]?.[child] ?? false
                          : safeValue[key] ?? false;
                        const onClickHandler = () => {
                          const updatedValue = { ...safeValue };
                          if (isNested) {
                            updatedValue[parent] = {
                              ...(safeValue[parent] || {}),
                              [child]: !currentValue,
                            };
                          } else {
                            updatedValue[key] = !currentValue;
                          }
                          field.onChange(updatedValue);
                        };

                        return (
                          <Button
                            key={key}
                            type="button"
                            variant="outline"
                            className={`h-[46px] text-base font-normal ${
                              currentValue
                                ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                                : "border-[#E1E1E1] text-[#6C696A]"
                            }`}
                            onClick={onClickHandler}
                          >
                            {label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Available Cuisines */}
                  <div className="space-y-2">
                    <Label className="block text-sm font-medium">
                      Available Cuisines
                    </Label>
                    <Select
                      value={safeValue.availableCuisines || ""}
                      onValueChange={(value) =>
                        field.onChange({
                          ...safeValue,
                          availableCuisines: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Cuisine" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Indian",
                          "Continental",
                          "Chinese",
                          "Italian",
                          "Local Cuisine",
                        ].map((cuisine) => (
                          <SelectItem key={cuisine} value={cuisine}>
                            {cuisine}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Special Dietary Meals */}
                  <div>
                    <Label className="block mb-2 text-sm font-medium">
                      Special Dietary Meals
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        {
                          key: "specialDietaryMeals.vegetarian",
                          label: "Vegetarian",
                        },
                        { key: "specialDietaryMeals.vegan", label: "Vegan" },
                        {
                          key: "specialDietaryMeals.glutenFree",
                          label: "Gluten Free",
                        },
                        { key: "specialDietaryMeals.halal", label: "Halal" },
                        { key: "specialDietaryMeals.kosher", label: "Kosher" },
                      ].map(({ key, label }) => {
                        const isNested = key.includes(".");
                        const [parent, child] = key.split(".");
                        const currentValue = isNested
                          ? safeValue[parent]?.[child] ?? false
                          : safeValue[key] ?? false;
                        const onClickHandler = () => {
                          const updatedValue = { ...safeValue };
                          if (isNested) {
                            updatedValue[parent] = {
                              ...(safeValue[parent] || {}),
                              [child]: !currentValue,
                            };
                          } else {
                            updatedValue[key] = !currentValue;
                          }
                          field.onChange(updatedValue);
                        };

                        return (
                          <Button
                            key={key}
                            type="button"
                            variant="outline"
                            className={`h-[46px] text-base font-normal ${
                              currentValue
                                ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                                : "border-[#E1E1E1] text-[#6C696A]"
                            }`}
                            onClick={onClickHandler}
                          >
                            {label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Meal Charges */}
                  <div className="flex flex-wrap gap-4">
                    {[
                      {
                        key: "mealCharges.breakfast",
                        label: "Breakfast Charges",
                      },
                      { key: "mealCharges.lunch", label: "Lunch Charges" },
                      { key: "mealCharges.dinner", label: "Dinner Charges" },
                    ].map(({ key, label }) => {
                      const isNested = key.includes(".");
                      const [parent, child] = key.split(".");
                      const value = isNested
                        ? safeValue[parent]?.[child]
                        : safeValue[key];
                      return (
                        <Input
                          key={key}
                          type="number"
                          placeholder={label}
                          value={value ?? ""}
                          onChange={(e) =>
                            isNested
                              ? field.onChange({
                                  ...safeValue,
                                  [parent]: {
                                    ...(safeValue[parent] || {}),
                                    [child]: Number(e.target.value),
                                  },
                                })
                              : field.onChange({
                                  ...safeValue,
                                  [key]: Number(e.target.value),
                                })
                          }
                          className="max-w-xs"
                        />
                      );
                    })}
                  </div>

                  {/* Dining Options */}
                  <div>
                    <Label className="block mb-2 text-sm font-medium">
                      Dining Options
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        {
                          key: "diningOptions.inRoomDining",
                          label: "In Room Dining",
                        },
                        { key: "diningOptions.buffet", label: "Buffet" },
                        { key: "diningOptions.aLaCarte", label: "A La Carte" },
                        {
                          key: "diningOptions.commonDiningArea",
                          label: "Common Dining Area",
                        },
                      ].map(({ key, label }) => {
                        const isNested = key.includes(".");
                        const [parent, child] = isNested
                          ? key.split(".")
                          : [null, null];
                        const currentValue = isNested
                          ? safeValue[parent]?.[child] ?? false
                          : safeValue[key] ?? false;
                        const onClickHandler = () => {
                          const updatedValue = { ...safeValue };
                          if (isNested) {
                            updatedValue[parent] = {
                              ...(safeValue[parent] || {}),
                              [child]: !currentValue,
                            };
                          } else {
                            updatedValue[key] = !currentValue;
                          }
                          field.onChange(updatedValue);
                        };
                        return (
                          <Button
                            key={key}
                            type="button"
                            variant="outline"
                            className={`h-[46px] text-base font-normal ${
                              currentValue
                                ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                                : "border-[#E1E1E1] text-[#6C696A]"
                            }`}
                            onClick={onClickHandler}
                          >
                            {label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          );
        }}
      />

      {/* Dormitory Specific Details */}
      <FormField
        control={form.control}
        name="dormitorySpecificDetails"
        render={({ field }) => {
          const safeValue = field.value || {};
          return (
            <FormItem>
              <FormLabel className="text-base font-medium text-[#0F0D0D]">
                Dormitory Specific Details
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {/* Total Beds */}
                  <Input
                    type="number"
                    placeholder="Total Beds"
                    value={safeValue.totalBeds ?? ""}
                    onChange={(e) =>
                      field.onChange({
                        ...safeValue,
                        totalBeds: Number(e.target.value),
                      })
                    }
                  />
                  {/* Other toggles */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      {
                        key: "bunkBedAvailability",
                        label: "Bunk Bed Availability",
                      },
                      { key: "lockerFacility", label: "Locker Facility" },
                      { key: "commonRoom", label: "Common Room" },
                      { key: "kitchenAccess", label: "Kitchen Access" },
                      { key: "diningArea", label: "Dining Area" },
                    ].map(({ key, label }) => {
                      const currentValue = safeValue[key] ?? false;
                      return (
                        <Button
                          key={key}
                          type="button"
                          variant="outline"
                          className={`h-[46px] text-base font-normal ${
                            currentValue
                              ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                              : "border-[#E1E1E1] text-[#6C696A]"
                          }`}
                          onClick={() =>
                            field.onChange({
                              ...safeValue,
                              [key]: !currentValue,
                            })
                          }
                        >
                          {label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          );
        }}
      />

      {/* Nearby Places */}
      <FormField
        control={form.control}
        name="nearbyPlaces"
        render={({ field }) => {
          const safeValue = field.value || {};
          return (
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
                  ].map(({ key, label }) => {
                    const currentValue = safeValue[key] ?? false;
                    return (
                      <Button
                        key={key}
                        type="button"
                        variant="outline"
                        className={`h-[46px] text-base font-normal ${
                          currentValue
                            ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                            : "border-[#E1E1E1] text-[#6C696A]"
                        }`}
                        onClick={() =>
                          field.onChange({
                            ...safeValue,
                            [key]: !currentValue,
                          })
                        }
                      >
                        {label}
                      </Button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          );
        }}
      />

      {/* Rules */}
      <FormField
        control={form.control}
        name="rules"
        render={({ field }) => {
          const safeValue = field.value || {};
          return (
            <FormItem>
              <FormLabel className="text-base font-medium text-[#0F0D0D]">
                Rules
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      type="time"
                      placeholder="Check-In Time"
                      value={safeValue.checkInTime || ""}
                      onChange={(e) =>
                        field.onChange({
                          ...safeValue,
                          checkInTime: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="time"
                      placeholder="Check-Out Time"
                      value={safeValue.checkOutTime || ""}
                      onChange={(e) =>
                        field.onChange({
                          ...safeValue,
                          checkOutTime: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: "smokingAllowed", label: "Smoking Allowed" },
                      { key: "alcoholAllowed", label: "Alcohol Allowed" },
                      { key: "petsAllowed", label: "Pets Allowed" },
                    ].map(({ key, label }) => {
                      const currentValue = safeValue[key] ?? false;
                      return (
                        <Button
                          key={key}
                          type="button"
                          variant="outline"
                          className={`h-[46px] text-base font-normal ${
                            currentValue
                              ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                              : "border-[#E1E1E1] text-[#6C696A]"
                          }`}
                          onClick={() =>
                            field.onChange({
                              ...safeValue,
                              [key]: !currentValue,
                            })
                          }
                        >
                          {label}
                        </Button>
                      );
                    })}
                  </div>
                  <Input
                    type="text"
                    placeholder="Quiet Hours (e.g., 10:00 PM - 6:00 AM)"
                    value={safeValue.quietHours || ""}
                    onChange={(e) =>
                      field.onChange({
                        ...safeValue,
                        quietHours: e.target.value,
                      })
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Visitor Policy"
                    value={safeValue.visitorPolicy || ""}
                    onChange={(e) =>
                      field.onChange({
                        ...safeValue,
                        visitorPolicy: e.target.value,
                      })
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Cancellation Policy"
                    value={safeValue.cancellationPolicy || ""}
                    onChange={(e) =>
                      field.onChange({
                        ...safeValue,
                        cancellationPolicy: e.target.value,
                      })
                    }
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          );
        }}
      />

      {/* Booking Options */}
      <FormField
        control={form.control}
        name="bookingOptions"
        render={({ field }) => {
          const safeValue = field.value || {};
          return (
            <FormItem>
              <FormLabel className="text-base font-medium text-[#0F0D0D]">
                Booking Options
              </FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "onlineBooking", label: "Online Booking" },
                    { key: "walkIn", label: "Walk-In" },
                    {
                      key: "preBookingRequired",
                      label: "Pre-Booking Required",
                    },
                    { key: "groupDiscounts", label: "Group Discounts" },
                    { key: "longStayDiscounts", label: "Long Stay Discounts" },
                  ].map(({ key, label }) => {
                    const currentValue = safeValue[key] ?? false;
                    return (
                      <Button
                        key={key}
                        type="button"
                        variant="outline"
                        className={`h-[46px] text-base font-normal ${
                          currentValue
                            ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                            : "border-[#E1E1E1] text-[#6C696A]"
                        }`}
                        onClick={() =>
                          field.onChange({
                            ...safeValue,
                            [key]: !currentValue,
                          })
                        }
                      >
                        {label}
                      </Button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          );
        }}
      />

      {/* Additional Features */}
      <FormField
        control={form.control}
        name="additionalFeatures"
        render={({ field }) => {
          const safeValue = field.value || {};
          return (
            <FormItem>
              <FormLabel className="text-base font-medium text-[#0F0D0D]">
                Additional Features
              </FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "childFriendly", label: "Child Friendly" },
                    { key: "coupleFriendly", label: "Couple Friendly" },
                    {
                      key: "seniorCitizenFriendly",
                      label: "Senior Citizen Friendly",
                    },
                    { key: "localIDAccepted", label: "Local ID Accepted" },
                    {
                      key: "pickupDropService",
                      label: "Pickup & Drop Service",
                    },
                    { key: "tourGuidance", label: "Tour Guidance" },
                  ].map(({ key, label }) => {
                    const currentValue = safeValue[key] ?? false;
                    return (
                      <Button
                        key={key}
                        type="button"
                        variant="outline"
                        className={`h-[46px] text-base font-normal ${
                          currentValue
                            ? "bg-[#F5F5F5] border-[#7B00FF] text-[#7B00FF]"
                            : "border-[#E1E1E1] text-[#6C696A]"
                        }`}
                        onClick={() =>
                          field.onChange({
                            ...safeValue,
                            [key]: !currentValue,
                          })
                        }
                      >
                        {label}
                      </Button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage className="text-red-500 text-sm" />
            </FormItem>
          );
        }}
      />
    </>
  );
};

export default HotelAmentiesForm;
