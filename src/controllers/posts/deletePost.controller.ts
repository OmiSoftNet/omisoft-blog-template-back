import { RequestHandler } from "express";
import PostModel from "../../models/Posts/Post.model";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const deletePostController: RequestHandler = async (req, res) => {
  const postId = req.params.id;
  try {
    const postToDelete = await PostModel.findById(postId);
    if (!postToDelete) {
      return ResponseService.error(res, 400, TEXT.ERRORS.postDoesntExists);
    }
    await PostModel.findByIdAndDelete(postId);

    ResponseService.success(res, postToDelete);
  } catch (error: any) {
    ResponseService.error(res, 400, error.message);
  }
};
export default deletePostController;
