// src/types/ticket.ts
import { z } from "zod";

export const ticketSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z
    .enum(["open", "in_progress", "closed"])
    .describe("Status is required"),
});

export type Ticket = z.infer<typeof ticketSchema>;
