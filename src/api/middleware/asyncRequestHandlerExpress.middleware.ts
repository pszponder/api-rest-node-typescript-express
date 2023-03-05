// https://stackoverflow.com/questions/52440075/wrapper-for-async-handlers-in-express-with-custom-request-properties

import { NextFunction, Request, RequestHandler, Response } from "express";

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

/**
 * Wraps an asynchronously called Request Handler function from ExpressJS
 * Catches errors and passes them to the next callback
 * @param handler Async express request handler/middleware which potentially throwing errors
 * @returns Async express request handler with error handling
 */
const wrapAsyncRequestHandler = (
  handler: AsyncRequestHandler,
): RequestHandler => {
  return (req, res, next) => {
    return handler(req, res, next).catch(next);
  };
};

export { wrapAsyncRequestHandler };
