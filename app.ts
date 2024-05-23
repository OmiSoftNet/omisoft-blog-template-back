import mongooseLoader from "./src/loaders/MongooseLoader";
import loadServer from "./src/loaders/ExpressLoader";
import CONFIG from "./src/config";

const port = CONFIG.PORT;

const startServer = () => {
  const app = loadServer();
  mongooseLoader();

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
};

startServer();
