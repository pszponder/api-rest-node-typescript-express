import * as z from "zod";

// ======================
// ======== Item ========
// ======================

// Specify a readonly tuple of possible options for item quality
const QUALITY = ["common", "uncommon", "rare", "legendary"] as const;
export type ItemQuality = (typeof QUALITY)[number];

// Define a validator for an Item object
export const Item = z.object({
  name: z.string().min(1),
  quality: z.enum(QUALITY),
  value: z.number(),
});

// Define a type from the Zod Item Validator
export type Item = z.infer<typeof Item>;

// ============================
// ======== ItemWithId ========
// ============================

// Expand the Item type with the id
export type ItemWithId = Item & { id: string };

// ==============================
// ======== ParamsWithId ========
// ==============================

export const ParamsWithId = z.object({
  id: z.string().min(1),
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;
