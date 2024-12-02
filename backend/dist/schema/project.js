"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = void 0;
const zod_1 = require("zod");
const statusEnum = ["Pending", "In Progress", "Completed"];
const priorityEnum = ["Low", "Medium", "High"];
// Define Zod schema
exports.projectSchema = zod_1.z.object({
    projectName: zod_1.z.string().trim().min(1, "Project name is required."),
    status: zod_1.z.enum(statusEnum, {
        errorMap: () => ({
            message: `Status must be one of ${statusEnum.join(", ")}`,
        }),
    }),
    priority: zod_1.z.enum(priorityEnum, {
        errorMap: () => ({
            message: `Priority must be one of ${priorityEnum.join(", ")}`,
        }),
    }),
    dueDate: zod_1.z.preprocess((value) => (typeof value === "string" ? new Date(value) : value), zod_1.z
        .date()
        .refine((date) => date >= new Date(), "Due date must be in the future.")),
    owner: zod_1.z.string().min(1, { message: "owner is required" }),
    // description: z
    //   .string()
    //   .min(1, "Description is required.")
    //   .max(500, "Description cannot exceed 500 characters."),
});
