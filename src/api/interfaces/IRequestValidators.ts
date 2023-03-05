/**
 * This Interface will be used by the validateRequest middleware
 * to validate the shape of the incoming request
 */

import { AnyZodObject } from "zod";

export interface IRequestValidators {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}
