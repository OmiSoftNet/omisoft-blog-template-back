import mongooseLoader from "./src/loaders/mongoose.loader";
import CONFIG from "./src/config";
import loadServer from "./src/loaders/express.loader";

const port = CONFIG.PORT;

const startServer = () => {
  const app = loadServer();
  mongooseLoader();

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
};

startServer();
