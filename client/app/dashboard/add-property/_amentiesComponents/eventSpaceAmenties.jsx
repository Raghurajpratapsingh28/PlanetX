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

const EventSpaceAmentiesForm = ({ form }) => {
  return (
    <div className="space-y-8">
      {/* Amenities Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Amenities
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {[
            "projector",
            "screen",
            "soundSystem",
            "lightingSetup",
            "airConditioning",
            "WiFi",
            "cateringServices",
            "decorationServices",
            "stageSetup",
            "podium",
            "securityServices",
            "cleaningServices",
          ].map((amenity) => (
            <FormField
              key={amenity}
              control={form.control}
              name={`amenities.${amenity}`}
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
                      {amenity.replace(/([A-Z])/g, " $1")}
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="col-span-4 space-y-3">
            <h4 className="font-medium">Parking Facilities</h4>
            <div className="grid grid-cols-2 gap-2">
              {["covered", "open"].map((type) => (
                <FormField
                  key={type}
                  control={form.control}
                  name={`amenities.parkingFacilities.${type}`}
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
                          {type} Parking
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

      {/* Facilities Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Facilities
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {["restrooms", "changingRoom", "powerBackup", "photoBooth"].map(
            (facility) => (
              <FormField
                key={facility}
                control={form.control}
                name={`facilities.${facility}`}
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
                        {facility.replace(/([A-Z])/g, " $1")}
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}
        </div>
      </div>

      {/* Available Spaces Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Available Spaces
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {["indoorSpace", "outdoorSpace", "balconyAccess"].map((space) => (
            <FormField
              key={space}
              control={form.control}
              name={`availableSpaces.${space}`}
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
                      {space.replace(/([A-Z])/g, " $1")}
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
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Booking Details
        </h3>
        <div className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="bookingDetails.minimumBookingDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Minimum Booking Duration
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 2 hours"
                    className="h-[50px] w-[300px]  px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bookingDetails.maximumBookingDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Maximum Booking Duration
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 8 hours"
                    className="h-[50px] w-[300px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bookingDetails.cancellationPolicy"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                  Cancellation Policy
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 48 hours notice"
                    className="h-[50px] w-[300px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Additional Services Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Additional Services
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            "eventPlannerSupport",
            "technicalStaffOnSite",
            "customizableLayouts",
            "loungeArea",
          ].map((service) => (
            <FormField
              key={service}
              control={form.control}
              name={`additionalServices.${service}`}
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
                      {service.replace(/([A-Z])/g, " $1")}
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      {/* Rules Section */}
      <div className="space-y-5">
        <h3 className="text-xl font-semibold font-poppins text-[#0F0D0D]">
          Rules
        </h3>
        <div className="grid grid-cols-1 gap-5">
          <div className="grid grid-cols-2 gap-2">
            {["alcoholAllowed", "smokingAllowed", "petFriendly"].map((rule) => (
              <FormField
                key={rule}
                control={form.control}
                name={`rules.${rule}`}
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
                        {rule.replace(/([A-Z])/g, " $1")}
                      </Button>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="rules.noiseLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                    Noise Limit
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., 80 dB after 10 PM"
                      className="h-[50px] w-[300px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rules.decorRestrictions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium font-poppins text-[#0F0D0D]">
                    Decor Restrictions
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., No permanent changes"
                      className="h-[50px] w-[300px] px-[15px] border-[#E1E1E1] rounded-lg text-[#9E9E9E] font-poppins"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSpaceAmentiesForm;
