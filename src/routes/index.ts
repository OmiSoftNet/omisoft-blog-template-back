import { Express } from "express";
import authRoute from "./auth.route";
import usersRoute from "./users.route";
import postsRoute from "./posts.route";
import oneTimeLinksRoute from "./oneTimeLinks";
import { TEXT } from "../utils/JoiErrors";

export default (app: Express) => {
  app.use(authRoute());
  app.use(usersRoute());
  app.use(postsRoute());
  app.use(oneTimeLinksRoute());

  // This is default in case of unmatched routes
  app.use(function (req, res) {
    res.status(405).json({
      error: TEXT.ERRORS.methodNotAllowed,
    });
  });
};
