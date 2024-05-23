import { RequestHandler } from "express";
import { STATUS_TYPES_ENUM } from "../../constants/PostStatusEnum";
import PostModel from "../../models/Posts/PostModel";
import ResponseService from "../../services/ResponseService";

const GetAllPostsUrlController: RequestHandler = async (req, res, next) => {
  try {
    const posts = await PostModel.find({ status: STATUS_TYPES_ENUM.PUBLISHED }, { __v: false });
    const postsUrls = posts.map((post) => {
      return { _id: post._id, url: post.url, title: post.title };
    });

    ResponseService.success(res, postsUrls);
  } catch (error: any) {
    ResponseService.error(next, error.message);
  }
};

export default GetAllPostsUrlController;
