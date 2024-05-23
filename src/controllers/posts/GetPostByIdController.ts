import { RequestHandler } from "express";
import PostModel from "../../models/Posts/PostModel";
import ResponseService from "../../services/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const GetPostByIdController: RequestHandler = async (req, res, next) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId).populate("similarArticles");

    if (!post) {
      return ResponseService.error(next, TEXT.ERRORS.postDoesntExists);
    }

    ResponseService.success(res, post);
  } catch (error: any) {
    ResponseService.error(next, error.message);
  }
};

export default GetPostByIdController;
