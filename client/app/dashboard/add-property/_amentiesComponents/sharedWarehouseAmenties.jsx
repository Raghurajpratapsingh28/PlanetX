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

const SharedWarehouseAmenities = ({ form }) => {
  return (
    <div className="space-y-8">
      {/* Amenities Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Amenities</h3>

        {/* Amenities as Toggle Buttons */}
        <div className="grid grid-cols-5 gap-2">
          {Object.entries({
            highSpeedWiFi: "High-Speed Wi-Fi",
            powerBackup: "Power Backup",
            airConditioning: "Air Conditioning",
            printingServices: "Printing Services",
            conferenceRooms: "Conference Rooms",
            phoneBooths: "Phone Booths",
            teaCoffee: "Tea & Coffee",
            parking: "Parking",
            access24x7: "24/7 Access",
            security: "Security",
            receptionServices: "Reception Services",
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
      </div>

      {/* Workspace Features Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Workspace Features</h3>

        {/* Workspace Features as Toggle Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {Object.entries({
            privateAccess: "Private Access",
            dedicatedSpace: "Dedicated Space",
            lockableOffice: "Lockable Office",
          }).map(([key, label]) => (
            <FormField
              key={key}
              control={form.control}
              name={`workspaceFeatures.${key}`}
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

        {/* Availability Status and Available From */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="workspaceFeatures.availabilityStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Available", "Unavailable"].map((option) => (
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
            name="workspaceFeatures.availableFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available From</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Meeting and Event Spaces Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Meeting & Event Spaces</h3>

        {/* Meeting and Event Features as Toggle Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {Object.entries({
            projector: "Projector",
            whiteboard: "Whiteboard",
            videoConferencing: "Video Conferencing",
            soundSystem: "Sound System",
            cateringServices: "Catering Services",
          }).map(([key, label]) => (
            <FormField
              key={key}
              control={form.control}
              name={`meetingAndEventSpaces.${key}`}
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

      {/* Booking Details Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Booking Details</h3>

        {/* Minimum and Maximum Booking Duration */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bookingDetails.minimumBookingDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Booking Duration</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g., 1 hour" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bookingDetails.maximumBookingDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maximum Booking Duration</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g., 12 hours" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Cancellation Policy */}
        <FormField
          control={form.control}
          name="bookingDetails.cancellationPolicy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cancellation Policy</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="e.g., 24 hours notice"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                      type="text"
                      placeholder="e.g., 9 AM - 6 PM"
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
                      type="text"
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
        </div>
      </div>
    </div>
  );
};

export default SharedWarehouseAmenities;
