import { Express } from "express";
import authRoute from "./auth.route";
import usersRoute from "./users.route";
import postsRoute from "./posts.route";
import emailsRoute from "./emails.route";
import oneTimeLinksRoute from "./oneTimeLinks";

export default (app: Express) => {
  app.use(authRoute());
  app.use(usersRoute());
  app.use(postsRoute());
  app.use(emailsRoute());
  app.use(oneTimeLinksRoute());
};
