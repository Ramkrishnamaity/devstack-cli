import { controller } from "#utils/helpers/controller.helper";

export const healthCheck = controller(async (_req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});
