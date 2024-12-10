import { z } from "zod";

const statusEnum = ["Pending", "In Progress", "Completed"] as const;
const priorityEnum = ["Low", "Medium", "High"] as const;

// Define Zod schema
export const projectSchema = z.object({
  projectName: z.string().trim().min(1, "Project name is required."),
  status: z.enum(statusEnum, {
    errorMap: () => ({
      message: `Status must be one of ${statusEnum.join(", ")}`,
    }),
  }),
  priority: z.enum(priorityEnum, {
    errorMap: () => ({
      message: `Priority must be one of ${priorityEnum.join(", ")}`,
    }),
  }),
  dueDate: z.preprocess(
    (value) => (typeof value === "string" ? new Date(value) : value),
    z
      .date()
      .refine((date) => date >= new Date(), "Due date must be in the future.")
  ),
  owner: z.string().min(1, { message: "owner is required" }),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(500, "Description cannot exceed 500 characters."),
});
