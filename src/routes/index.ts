import { Express } from "express";
import authRoute from "./AuthRoute";
import oneTimeLinksRoute from "./OneTimeLinksRoute";
import postsRoute from "./PostsRoute";
import usersRoute from "./UsersRoute";
import { TEXT } from "../utils/JoiErrors";

export default (app: Express) => {
  app.use(authRoute());
  app.use(oneTimeLinksRoute());
  app.use(postsRoute());
  app.use(usersRoute());

  // This is default in case of unmatched routes
  app.use(function (req, res) {
    res.status(405).json({
      error: TEXT.ERRORS.methodNotAllowed,
    });
  });
};
