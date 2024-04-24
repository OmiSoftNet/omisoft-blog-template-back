import mongoose from "mongoose";
import CONFIG from "../config";

export default () => {
  mongoose.connect(CONFIG.MONGODB_CLUSTER_URL).then(() => {
    console.log("[*] MongoDB database is connected");
  });
};
