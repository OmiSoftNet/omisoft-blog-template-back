import { RequestHandler } from "express";
import { STATUS_TYPES_ENUM } from "../../constants/PostStatusEnum";
import PostModel from "../../models/Posts/PostModel";
import { TEXT } from "../../utils/JoiErrors";
import ResponseService from "../../services/ResponseService";
import { validateStatusFields, postValidationSchema, publishValidationSchema } from "../../utils/validation";

const UpdatePostByIdController: RequestHandler = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return ResponseService.error(next, TEXT.ERRORS.postDoesntExists);
    }
    const checkedValues = { ...post.toObject(), ...req.body };
    delete checkedValues._id;
    delete checkedValues.createdAt;
    delete checkedValues.updatedAt;
    delete checkedValues.__v;
    if (await validateStatusFields(postValidationSchema, checkedValues, res, next)) return;
    if (req.body.status === STATUS_TYPES_ENUM.PUBLISHED) {
      if (await validateStatusFields(publishValidationSchema, checkedValues, res, next)) return;
    }
    const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    if (!updatedPost) {
      return ResponseService.error(next, TEXT.ERRORS.postDoesntExists);
    }
    ResponseService.success(res, updatedPost);
  } catch (error: any) {
    res.status(400).json({
      error: error.message,
    });
  }
};
export default UpdatePostByIdController;
