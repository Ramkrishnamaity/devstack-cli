import { Request, Response } from "express";
import { controller } from "@/utils/helpers/controller.helper";

export const healthCheck = controller(async (_req: Request, res: Response) => {
  res.json({ status: "ok", message: "Server is running" });
});
