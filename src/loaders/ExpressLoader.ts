import express, { Express } from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "../../swagger.json";
import routes from "../routes";
import errorHandlerMiddleware from "../middleware/ErrorHandlerMiddleware";
import { corsOptions } from "../config/CorsConfig";
import authVerifyMiddleware from "../middleware/AuthVerifyMiddleware";
import { API_ROUTES } from "../config/ApiRoutes";
import { isDevEnv } from "../utils/EnvChecker";
import cors from "cors";

export default function loadServer() {
  const app: Express = express();

  app.use(cors(corsOptions)); // Apply CORS middleware

  // Preflight requests handling
  app.options("*", cors(corsOptions)); // Handle preflight requests

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });

  app.use(express.json());
  app.use(authVerifyMiddleware);

  if (isDevEnv()) {
    app.use(morgan("tiny"));

    app.use(API_ROUTES.SERVICES.SWAGGER, swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  }

  routes(app);

  app.use(errorHandlerMiddleware);

  return app;
}
