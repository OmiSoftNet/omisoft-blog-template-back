import { RequestHandler } from "express";
import { STATUS_TYPES_ENUM } from "../../constants/postStatus";
import PostModel from "../../models/Posts/Post.model";
import ResponseService from "../../utils/ResponseService";

const getAllPostUrlController: RequestHandler = async (req, res) => {
  try {
    const posts = await PostModel.find({ status: STATUS_TYPES_ENUM.PUBLISHED }, { __v: false });
    const postsUrls = posts.map((post) => {
      return { _id: post._id, url: post.url, title: post.title };
    });

    ResponseService.success(res, postsUrls);
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};

export default getAllPostUrlController;
