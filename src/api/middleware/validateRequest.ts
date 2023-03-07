import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

/**
 * This Interface will be used by the validateRequest middleware
 * to validate the shape of the incoming request
 */
export interface IRequestValidator {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}

/**
 * Validates a request against passed in Zod params, body, or query validator
 * If there is an error, pass error it to the next middleware
 * If no error, move to next middleware without error
 * @param validators
 */
export function validateRequest(validators: IRequestValidator) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(422);
      }
      next(error);
    }
  };
}
