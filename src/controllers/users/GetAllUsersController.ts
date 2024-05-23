import { RequestHandler } from "express";
import UserModel from "../../models/Users/UserModel";
import ResponseService from "../../services/ResponseService";

const GetAllUsersController: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserModel.paginate(
      {},
      {
        page: Number(req.query.page ?? 1),
        limit: Number(req.query.limit ?? 30),
        select: ["-hashedPassword"],
      }
    );

    ResponseService.success(res, users);
  } catch (error: any) {
    ResponseService.error(next, error.message);
  }
};
export default GetAllUsersController;
