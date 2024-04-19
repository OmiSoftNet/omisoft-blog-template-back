import { RequestHandler } from "express";
import path from "path";
import ResponseService from "../../utils/ResponseService";
import PostModel from "../../models/Posts/Post.model";

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const importPosts: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      return;
    }
    const file = req.file;

    const obj = fs.readFileSync(
      path.join(__dirname, `../../../uploads/${file.filename}`)
    );

    const posts = JSON.parse(obj).map((post: any) => {
      delete post._id;
      return { ...post };
    });

    await PostModel.insertMany(posts);

    await unlinkFile(file.path);

    ResponseService.success(res, posts);
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};

export default importPosts;
