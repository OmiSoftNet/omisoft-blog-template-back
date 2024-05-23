import { RequestHandler } from "express";
import path from "path";
import ResponseService from "../../services/ResponseService";
import PostModel from "../../models/Posts/PostModel";

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const ImportPostsController: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      return;
    }
    const file = req.file;

    const obj = fs.readFileSync(path.join(__dirname, `../../../uploads/${file.filename}`));

    const posts = JSON.parse(obj).map((post: any) => {
      delete post._id;
      return { ...post };
    });

    await PostModel.insertMany(posts);

    await unlinkFile(file.path);

    ResponseService.success(res, posts);
  } catch (error: any) {
    ResponseService.error(next, error.message);
  }
};

export default ImportPostsController;
