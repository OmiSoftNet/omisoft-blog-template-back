import mongoose from "mongoose";
import { IOneTimeLinksSchema } from "./types";

const OneTimeLinksSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model<IOneTimeLinksSchema>("OneTimeLinks", OneTimeLinksSchema);
