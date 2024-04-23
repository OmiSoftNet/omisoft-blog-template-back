import { RequestHandler } from "express";
import PostModel from "../../models/Posts/Post.model";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";
import { STATUS_TYPES_ENUM } from "../../constants/postStatus";

const postsBackup: RequestHandler = async (req, res) => {
  const queryStatus = req.query.status;
  const sort = req.query.sort;

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
        sort: sort ? "-updatedAt" : "-createdAt",
      }
    );
    if (!posts) {
      return ResponseService.error(res, TEXT.ERRORS.postDoesntExists);
    }

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    res.header("Content-Type", "application/json");
    res.attachment(`Posts - ${dd}.${mm}.${yyyy}.json`);
    res.send(posts.docs);
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};

export default postsBackup;
