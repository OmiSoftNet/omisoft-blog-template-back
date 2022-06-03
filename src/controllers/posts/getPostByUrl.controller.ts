import { RequestHandler } from "express";
import PostModel from "../../models/Posts/Post.model";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const getPostByUrlController: RequestHandler = async (req, res) => {
  const postUrl = req.params.url;

  try {
    const post = await PostModel.findOne({ url: postUrl }).populate('similarArticles');;

    if (!post) {
      return ResponseService.error(res, 400, TEXT.ERRORS.postDoesntExists);
    }

    ResponseService.success(res, post);
  } catch (error: any) {
    ResponseService.error(res, 400, error.message);
  }
};

export default getPostByUrlController;
