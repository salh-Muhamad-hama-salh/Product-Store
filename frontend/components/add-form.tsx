"use client";

import { z } from "zod";

export const AddformSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.string().min(1, "Price must be at least 0"),
  imageURL: z.string().url("Invalid URL").optional(),
});
