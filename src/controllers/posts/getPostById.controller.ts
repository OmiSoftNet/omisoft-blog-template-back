import { RequestHandler } from "express";
import PostModel from "../../models/Posts/Post.model";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const getPostByIdController: RequestHandler = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId).populate("similarArticles");

    if (!post) {
      return ResponseService.error(res, TEXT.ERRORS.postDoesntExists);
    }

    ResponseService.success(res, post);
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};

export default getPostByIdController;
