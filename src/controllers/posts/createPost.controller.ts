import { RequestHandler } from "express";
import PostModel from "../../models/Posts/Post.model";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";
import { STATUS_TYPES_ENUM } from "../../constants/postStatus";
import {
  postValidationSchema,
  validateStatusFields,
} from "../../utils/validation";

const createPostController: RequestHandler = async (req, res) => {
  if (await validateStatusFields(postValidationSchema, req.body, res)) return;
  try {
    const textForUrl = req.body.url
      ? req.body.url.toLowerCase().replace(/ /g, "-")
      : req.body.title.toLowerCase().replace(/ /g, "-");
    const existingPost = await PostModel.findOne({
      url: textForUrl,
    });
    if (existingPost) {
      return ResponseService.error(res, 400, TEXT.ERRORS.postExists);
    }
    const newPost = await PostModel.create({
      ...req.body,
      title: req.body.title,
      status: STATUS_TYPES_ENUM.DRAFT,
    });

    ResponseService.success(res, newPost);
  } catch (error: any) {
    const message =
      error.code === 11000 ? TEXT.ERRORS.postExists : error.message;
    res.status(400).json({
      error: message,
    });
  }
};

export default createPostController;
