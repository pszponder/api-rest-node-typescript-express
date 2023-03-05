import { NextFunction, Request, Response } from "express";

/**
 * Handle cases where route is not found
 * Passes the error to the next middleware (should be errorHandler)
 * @param req
 * @param res
 * @param next
 */
export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);

  // Pass the error to the next function to be handled by the next middleware func
  next(error);
}
