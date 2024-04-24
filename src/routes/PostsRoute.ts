import { Router } from "express";
import { API_ROUTES } from "../config/apiRoutes";
import {
  createPostController,
  deletePostController,
  getAllPostController,
  getPostByUrlController,
  getAllPostUrlController,
  updatePostByIdController,
  postsBackup,
  importPosts,
  getPostByIdController,
  getAllPostAdminController,
} from "../controllers/posts";
import multer from "multer";
import { adminVerifyMiddleware } from "../middleware/RoleVerifyMiddleware";
const upload = multer({ dest: "uploads/" });

export default () => {
  const route = Router();

  route.get(API_ROUTES.POSTS.BACKUP, postsBackup);
  route.get(API_ROUTES.POSTS.ALL_POSTS, getAllPostController);
  route.get(API_ROUTES.POSTS.ALL_POSTS_ADMIN, getAllPostAdminController);
  route.get(API_ROUTES.POSTS.BACKUP, postsBackup);
  route.get(API_ROUTES.POSTS.POSTS_URL, getAllPostUrlController);
  route.get(API_ROUTES.POSTS.POST_BY_URL, getPostByUrlController);
  route.get(API_ROUTES.POSTS.POST_BY_ID, getPostByIdController);
  route.post(API_ROUTES.POSTS.IMPORT, upload.single("posts"), importPosts);
  route.post(API_ROUTES.POSTS.CREATE, createPostController);
  route.put(API_ROUTES.POSTS.UPDATE_POST, updatePostByIdController);
  route.delete(API_ROUTES.POSTS.DELETE, adminVerifyMiddleware, deletePostController);

  return route;
};
