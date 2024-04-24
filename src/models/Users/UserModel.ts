import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import mongoosePaginate from "mongoose-paginate-v2";
import { TOKEN_CONFIG } from "../../config/JwtConfig";
import CONFIG from "../../config";
import * as bcrypt from "bcrypt";
import { IUser } from "./types";
import { ModelWithPagination } from "../types";
import RefreshToken from "../RefreshToken/RefreshTokenModel";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.virtual("password")
  .get(function (this: any) {
    return this.hashedPassword;
  })
  .set(function (this: any, password: string) {
    this.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
  });

UserSchema.methods.validatePassword = function (password: string) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

UserSchema.methods.setPassword = function (password: string) {
  this.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      role: this.role,
      type: TOKEN_CONFIG.ACCESS.type,
    },
    CONFIG.JWT_SECRET,
    { expiresIn: TOKEN_CONFIG.ACCESS.expiresIn }
  );
};

UserSchema.methods.generateRefreshToken = async function () {
  await RefreshToken.findOneAndDelete({ user: this._id });
  const newToken = await RefreshToken.create({ user: this._id });
  return jwt.sign(
    {
      tokenId: newToken._id,
      type: TOKEN_CONFIG.REFRESH.type,
    },
    CONFIG.JWT_SECRET,
    {
      expiresIn: TOKEN_CONFIG.REFRESH.expiresIn,
    }
  );
};

UserSchema.plugin(mongoosePaginate);

const UsersSchemaWithPagination: ModelWithPagination<IUser> = mongoose.model<IUser>(
  "Users",
  UserSchema
) as ModelWithPagination<IUser>;

export default UsersSchemaWithPagination;
