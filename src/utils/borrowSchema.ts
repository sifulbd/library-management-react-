import { z } from "zod";

export const borrowSchema = z.object({
    quantity: z.number({ message: "Quantity is required" }).int().min(1, { message: "Quantity must be at least 1" }),
    dueDate: z.date({ message: "Due date is required" }).refine((date) => date >= new Date(), {
        message: "Due date must be in the future",
    }),
});
