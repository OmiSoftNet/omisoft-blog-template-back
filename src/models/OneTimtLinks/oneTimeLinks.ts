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
  {
    timestamps: true,
  }
);

export default mongoose.model<IOneTimeLinksSchema>(
  "OneTimeLinks",
  OneTimeLinksSchema
);
