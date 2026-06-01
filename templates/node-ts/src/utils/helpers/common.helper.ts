import fs from "fs";
import path from "path";
import moment from "moment";

const getDate = (): string => moment.utc().format("YYYY-MM-DD");

const getTime = (): string => moment.utc().format("HH:mm:ss");

const getDateTime = (): string => moment.utc().format("YYYY-MM-DD HH:mm:ss");

const logError = async (err: any, req?: any): Promise<void> => {
  try {
    const logDir = path.resolve("./logs");

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logFile = path.join(logDir, `${getDate()}.log`);

    const entry = [
      `[${getDateTime()} UTC] ${req?.method || "UNKNOWN"} ${req?.originalUrl || ""}`,
      `Error: ${err?.message || String(err)}`,
      `Stack: ${err?.stack || "No stack trace"}`,
      "----------------------------------------",
      "",
    ].join("\n");

    fs.appendFileSync(logFile, entry, "utf8");
  } catch (_) {}
};

const helpers = { getDate, getTime, getDateTime, logError };

export default helpers;
