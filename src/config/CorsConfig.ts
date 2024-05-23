import cors from "cors";

const whitelist = ["http://localhost:3000"];

export const corsOptions: cors.CorsOptions = {
  exposedHeaders: ["Access-Control-Allow-Origin"],
  preflightContinue: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "authorization",
    "Accept-Language",
    "Access-Control-Allow-Methods",
    "Access-Control-Request-Headers",
    "Access-Control-Allow-Origin",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
