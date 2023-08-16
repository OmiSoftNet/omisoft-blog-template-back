import express from "express";
import expressLoader from "./src/loaders/express.loader";
import mongooseLoader from "./src/loaders/mongoose.loader";
import CONFIG from "./src/config";

const port = CONFIG.PORT;

const startServer = () => {
  const app = express();

  expressLoader(app);
  mongooseLoader();

  app.listen(port, () => {
    console.log(`[*] Server successfully started at: ${port}`);
  });
};

startServer();
