import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { STATUS_TYPES_ENUM } from "../../constants/postStatus";
import { ModelWithPagination } from "../types";
import { IPost } from "./types";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
    },
    topic: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    imageUrl: {
      type: String,
    },
    imageAlt: {
      type: String,
    },
    seoTitle: {
      type: String,
    },
    seoDesctiption: {
      type: String,
    },
    url: {
      type: String,
    },
    status: {
      type: String,
      enum: STATUS_TYPES_ENUM,
      default: "DRAFT",
    },
    similarArticles: [
      {
        type: String,
        ref: "Posts",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PostSchema.plugin(mongoosePaginate);

const PostsSchemaWithPagination: ModelWithPagination<IPost> = mongoose.model<IPost>(
  "Posts",
  PostSchema
) as ModelWithPagination<IPost>;
export default PostsSchemaWithPagination;
