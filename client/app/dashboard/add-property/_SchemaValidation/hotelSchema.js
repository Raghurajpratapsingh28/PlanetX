import { z } from "zod";

export const HotelSchema = z.object({
  subCategory: z.enum(["Hotel", "Dormitory"], {
    errorMap: () => {
      return { message: "Sub-Category is required" };
    },
  }),
  propertyDetails: z.object({
    propertyName: z.string().min(1, "Property name is required"),
    propertyType: z.enum(
      [
        "Budget",
        "Luxury",
        "Boutique",
        "Business",
        "Heritage",
        "Resort",
        "Hostel",
        "Shared Dormitory",
      ],
      { errorMap: () => ({ message: "Property type is required" }) }
    ),
    starRating: z
      .number()
      .int()
      .min(1, "Star rating must be between 1 and 5")
      .max(5, "Star rating must be between 1 and 5"),
    totalRooms: z.number().int().min(1, "Total rooms must be at least 1"),
    roomTypes: z.enum(
      ["Single Room", "Double Room", "Suite", "Dormitory Bed", "Family Room"],
      { errorMap: () => ({ message: "Room types are required" }) }
    ),
  }),
  roomDetails: z.object({
    roomType: z.string().min(1, "Room type is required"),
    roomSize: z.string().min(1, "Room size is required"),
    beds: z.number().int().min(1, "Number of beds must be at least 1"),
    bathroomType: z.string().min(1, "Bathroom type is required"),
    airConditioning: z.preprocess(
      (val) => val == "true" || val == true,
      z.boolean({ required_error: "Please provide details" })
    ),
    balcony: z.preprocess(
      (val) => val == "true" || val == true,
      z.boolean({ required_error: "Please provide details" })
    ),
    smokingAllowed: z.preprocess(
      (val) => val == "true" || val == true,
      z.boolean({ required_error: "Please provide details" })
    ),
    occupancy: z.string().min(1, "Occupancy is required"),
    pricePerNight: z.number().min(1, "Price per night must be greater than 0"),
    availability: z.preprocess(
      (val) => val == "true" || val == true,
      z.boolean({ required_error: "Please provide availability" })
    ),
  }),
});
