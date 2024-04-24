import { RequestHandler } from "express";
import PostModel from "../../models/Posts/PostModel";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";
import { STATUS_TYPES_ENUM } from "../../constants/PostStatusEnum";

const getAllPostController: RequestHandler = async (req, res) => {
  const queryStatus = req.query.status;

  let searchParams: { status?: string } = {
    status: STATUS_TYPES_ENUM.PUBLISHED,
  };

  if (queryStatus === STATUS_TYPES_ENUM.ARCHIVED || queryStatus === STATUS_TYPES_ENUM.DRAFT) {
    searchParams.status = queryStatus;
  }
  if (queryStatus === "All") {
    searchParams = {};
  }
  try {
    const posts = await PostModel.paginate(
      { ...searchParams },
      {
        page: Number(req.query.page ?? 1),
        limit: Number(req.query.limit ?? 8),
        sort: "-createdAt",
      }
    );
    if (!posts) {
      return ResponseService.error(res, TEXT.ERRORS.postDoesntExists);
    }
    ResponseService.success(res, posts);
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};

export default getAllPostController;
