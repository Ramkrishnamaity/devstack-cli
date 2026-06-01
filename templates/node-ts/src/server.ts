import app from "@/app";
import { env } from "@/config/env";

const startServer = () => {
  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  })
    .on("error", (err) => {
      console.error("Server error:", err);
      process.exit(1);
    });
};

startServer();
