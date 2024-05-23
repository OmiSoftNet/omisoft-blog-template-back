import { RequestHandler } from "express";
import PostModel from "../../models/Posts/PostModel";
import ResponseService from "../../services/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const DeletePostController: RequestHandler = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const postToDelete = await PostModel.findById(postId);
    if (!postToDelete) {
      return ResponseService.error(next, TEXT.ERRORS.postDoesntExists);
    }
    await PostModel.findByIdAndDelete(postId);

    ResponseService.success(res, postToDelete);
  } catch (error: any) {
    ResponseService.error(next, error.message);
  }
};
export default DeletePostController;
