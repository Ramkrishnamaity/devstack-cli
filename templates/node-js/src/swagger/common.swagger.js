export const commonPaths = {
  "/health": {
    get: {
      summary: "Health Check",
      tags: ["Health"],
      responses: {
        "200": {
          description: "Server is running",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string", example: "ok" },
                  message: { type: "string", example: "Server is running" },
                },
              },
            },
          },
        },
      },
    },
  },
};
