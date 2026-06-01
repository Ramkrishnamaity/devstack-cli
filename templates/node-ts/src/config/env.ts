import "dotenv/config";
import { envSchema } from "@/utils/schemas/common.schema";

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

export const env = {
  port: value.PORT as number,
  node_env: value.NODE_ENV as string,
  client_url: value.CLIENT_URL as string,
  get is_production() {
    return this.node_env === "production";
  },
};
