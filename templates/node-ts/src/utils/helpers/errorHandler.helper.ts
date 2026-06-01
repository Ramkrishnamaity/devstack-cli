import { Request, Response, NextFunction } from "express";
import { StatusError } from "@/utils/helpers/statusError.helper";
import helpers from "@/utils/helpers/common.helper";

export const handleError = (err: any, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof StatusError) {
    return res.status(err.statusCode).json({
      status: false,
      message: err.message,
    });
  }

  helpers.logError(err, req);

  return res.status(500).json({
    status: false,
    message: "Server error. Please try again later.",
  });
};
