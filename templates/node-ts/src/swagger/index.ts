import { commonPaths } from "@/swagger/common.swagger";

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "0.1.0",
    description: "Auto-generated API docs",
  },
  servers: [
    {
      url: "/api/v1",
      description: "Local server",
    },
  ],
  tags: [
    {
      name: "Health",
      description: "Server health check endpoints",
    },
  ],
  paths: {
    ...commonPaths,
  },
  components: {
    schemas: {
      serverSuccessResponse: {
        title: "Success Response",
        type: "object",
        properties: {
          status: { type: "boolean" },
          message: { type: "string" },
          data: { type: "object" },
        },
        required: ["status", "message"],
        example: {
          status: true,
          message: "Data fetched successfully!",
          data: [],
        },
      },
      serverErrorResponse: {
        title: "Server Error Response",
        type: "object",
        properties: {
          status: { type: "boolean" },
          message: { type: "string" },
        },
        required: ["status", "message"],
        example: {
          status: false,
          message: "Server error. Please try again later.",
        },
      },
      badRequestResponse: {
        title: "Bad Request Response",
        type: "object",
        properties: {
          status: { type: "boolean" },
          message: { type: "string" },
        },
        required: ["status", "message"],
        example: {
          status: false,
          message: "Invalid data!",
        },
      },
      unauthorizeResponse: {
        title: "Unauthorized Response",
        type: "object",
        properties: {
          status: { type: "boolean" },
          message: { type: "string" },
        },
        required: ["status", "message"],
        example: {
          status: false,
          message: "Unauthorized!",
        },
      },
      forbiddenResponse: {
        title: "Forbidden Response",
        type: "object",
        properties: {
          status: { type: "boolean" },
          message: { type: "string" },
        },
        required: ["status", "message"],
        example: {
          status: false,
          message: "Access denied!",
        },
      },
      notFoundResponse: {
        title: "Not Found Response",
        type: "object",
        properties: {
          status: { type: "boolean" },
          message: { type: "string" },
        },
        required: ["status", "message"],
        example: {
          status: false,
          message: "Resource not found!",
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
