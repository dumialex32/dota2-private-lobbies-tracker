import { NextFunction, Request, Response } from "express";

export class AppErrorHandler extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor); // captures the stack trace while excluding the current constructor from it.
  }
}

// handler for unknown routes
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Not found ${req.originalUrl}`);
  res.status(404);
  next(err);
};

// handler for errors passed via next(err)
const errorMiddleware = (
  err: AppErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(err);

  res.status(statusCode).json({
    status: "Error",
    statusCode,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorMiddleware;
