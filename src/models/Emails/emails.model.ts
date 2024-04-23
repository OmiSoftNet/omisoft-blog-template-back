import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IEmails } from "./types";
import { ModelWithPagination } from "../types";

const EmailsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

EmailsSchema.plugin(mongoosePaginate);

const EmailsSchemaWithPagination: ModelWithPagination<IEmails> = mongoose.model<IEmails>(
  "Emails",
  EmailsSchema
) as ModelWithPagination<IEmails>;

export default EmailsSchemaWithPagination;
