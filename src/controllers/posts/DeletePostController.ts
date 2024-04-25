import { RequestHandler } from "express";
import PostModel from "../../models/Posts/PostModel";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";

const DeletePostController: RequestHandler = async (req, res) => {
  const postId = req.params.id;
  try {
    const postToDelete = await PostModel.findById(postId);
    if (!postToDelete) {
      return ResponseService.error(res, TEXT.ERRORS.postDoesntExists);
    }
    await PostModel.findByIdAndDelete(postId);

    ResponseService.success(res, postToDelete);
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};
export default DeletePostController;
