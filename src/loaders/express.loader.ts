import express, { Express } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "../../swagger.json";
import routes from "../routes";
import errorHandlerMiddleware from "../middleware/errorHandler.middleware";
import corsMiddleware from "../middleware/cors.middleware";
import authVerifyMiddleware from "../middleware/authVerify.middleware";
import { API_ROUTES } from "../config/apiRoutes";

export default (app: Express) => {
  app.use(corsMiddleware);
  app.use(express.json());
  app.use(authVerifyMiddleware);

  routes(app);

  app.use(
    API_ROUTES.SERVICES.SWAGGER,
    swaggerUI.serve,
    swaggerUI.setup(swaggerDoc)
  );

  app.use(errorHandlerMiddleware);
};
