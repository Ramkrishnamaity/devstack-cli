import Joi from "joi";

export const envSchema = Joi.object({
  PORT: Joi.number().default(8000),
  NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
  CLIENT_URL: Joi.string().default("http://localhost:3000"),
}).unknown(true);
