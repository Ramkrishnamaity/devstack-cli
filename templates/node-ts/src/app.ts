import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { env } from "@/config/env";
import { swaggerSpec } from "@/swagger/index";
import router from "@/routes/index";
import { handleError } from "@/utils/helpers/errorHandler.helper";
import { StatusError } from "@/utils/helpers/statusError.helper";

const app = express();

// trust proxy for nginx/load balancer — required for rate limiter IP detection
app.set("trust proxy", 1);

// swagger ui
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// security headers
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
        frameguard: { action: "deny" },
        xPoweredBy: false,
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                frameAncestors: ["'none'"],
            },
        },
    })
);
app.disable("x-powered-by");

// cache-control headers — prevent caching of sensitive API responses
app.use("/api/v1", (_req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    res.removeHeader("Server");
    next();
});

// rate limiter — 1000 requests per 15 minutes
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 1000,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (_req: Request, res: Response) => {
            res.status(429).json({
                status: false,
                message: "Too many requests, please try again later.",
            });
        },
    })
);

// body parsers + cookie parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// cors
app.use(
    cors({
        origin: env.client_url,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        maxAge: 86400,
        credentials: true,
    })
);

// routes
app.use("/api/v1", router);

// 404 handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(StatusError.notFound("Route not found"));
});

// global error handler
app.use(handleError);

export default app;
