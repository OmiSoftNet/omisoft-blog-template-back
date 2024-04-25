import { RequestHandler } from "express";
import UserModel from "../../models/Users/UserModel";
import ResponseService from "../../utils/ResponseService";

const GetAdminController: RequestHandler = async (req, res) => {
  try {
    const response = await UserModel.findOne(
      { role: "ADMIN" },
      {
        __v: false,
        hashedPassword: false,
      }
    );

    const admin = response ? { hasAdmin: true } : response;

    ResponseService.success(res, admin);
  } catch (error: any) {
    ResponseService.error(res, error.message);
  }
};
export default GetAdminController;
