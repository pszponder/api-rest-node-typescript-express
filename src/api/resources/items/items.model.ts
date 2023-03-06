import * as z from "zod";

// Specify a readonly tuple of possible options for item quality
const QUALITY = ["common", "uncommon", "rare", "legendary"] as const;

// Define a validator for an Item object
const Item = z.object({
  name: z.string().min(1),
  quality: z.enum(QUALITY),
  value: z.number(),
});

// Define a type from the Zod Item Validator
export type Item = z.infer<typeof Item>;

// Expand the Item type with the id
export type ItemWithId = Item & { id: string };
