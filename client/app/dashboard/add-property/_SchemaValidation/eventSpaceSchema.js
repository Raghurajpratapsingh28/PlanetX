import { z } from "zod";

const eventSpaceSchema = z.object({
  subCategory: z.enum(["Event Space"], {
    required_error: "Sub-category is required",
  }),
  type: z.enum(["Event Space"], {
    required_error: "Type is required",
  }),
  propertyDetails: z.object({
    totalGuests: z
      .number({
        required_error: "Total guests capacity is required",
        invalid_type_error: "Must be a number",
      })
      .int("Must be an integer")
      .min(1, "Minimum capacity is 1 guest"),
    seatingArrangement: z.object({
      theaterStyle: z
        .number({
          required_error: "Theater style capacity is required",
          invalid_type_error: "Must be a number",
        })
        .int("Must be an integer")
        .min(0, "Cannot be negative"),
      classroomStyle: z
        .number({
          required_error: "Classroom style capacity is required",
          invalid_type_error: "Must be a number",
        })
        .int("Must be an integer")
        .min(0, "Cannot be negative"),
      banquetStyle: z
        .number({
          required_error: "Banquet style capacity is required",
          invalid_type_error: "Must be a number",
        })
        .int("Must be an integer")
        .min(0, "Cannot be negative"),
      conferenceStyle: z
        .number({
          required_error: "Conference style capacity is required",
          invalid_type_error: "Must be a number",
        })
        .int("Must be an integer")
        .min(0, "Cannot be negative"),
    }),
  }),
});

export default eventSpaceSchema;
