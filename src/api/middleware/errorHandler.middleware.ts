import { NextFunction, Request, Response } from "express";
import { envVars as env } from "../../utils/parseEnvVars.js";
import { IErrorResponse } from "../interfaces/IErrorResponse.js";

/**
 * Set the message and stack trace (if in development environment) of the response
 * Don't want to share error stack if in production environment
 * @param err
 * @param req
 * @param res
 * @param next
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<IErrorResponse>,
  next: NextFunction,
) {
  // Set status code based on the response
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  // Set the response body json
  res.json({
    message: err.message,
    stack: env.NODE_ENV.toLowerCase() === "production" ? "🥞" : err.stack,
  });

  // Invoke the next middleware function
  next();
}
