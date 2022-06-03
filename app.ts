import express from "express";
import dotenv from "dotenv";
import path from "path";
import expressLoader from "./src/loaders/express.loader";
import mongooseLoader from "./src/loaders/mongoose.loader";

dotenv.config({
  path: path.join(__dirname, ".env"),
});

const port = process.env.PORT ?? 3000;

const startServer = () => {
  const app = express();

  expressLoader(app);
  mongooseLoader();

  app.listen(port, () => {
    console.log(`[*] Server successfully started at: ${port}`);
  });
};

startServer();
