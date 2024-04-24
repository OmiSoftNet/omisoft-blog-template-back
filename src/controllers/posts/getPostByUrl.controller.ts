import { RequestHandler } from "express";
import PostModel from "../../models/Posts/PostModel";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const getPostByUrlController: RequestHandler = async (req, res) => {
  const postUrl = req.params.url;

  try {
    const post = await PostModel.findOne({ url: postUrl }).populate("similarArticles");

    if (!post) {
      return ResponseService.error(res, TEXT.ERRORS.postDoesntExists);
    }

    ResponseService.success(res, post);
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};

export default getPostByUrlController;
