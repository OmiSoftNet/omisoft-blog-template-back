import { IUser } from "../../src/models/Users/types";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
