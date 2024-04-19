import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import CONFIG from "../../config";
import { TOKEN_CONFIG } from "../../config/token";
import RefreshToken from "../../models/RefreshToken/RefreshToken";
import UserModel from "../../models/Users/User.model";

const updateTokens: RequestHandler = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const decoded: any = jwt.verify(refreshToken, CONFIG.JWT_SECRET);

    if (decoded.type !== TOKEN_CONFIG.REFRESH.type) {
      res.status(400).json({
        error: "Invalid token!",
      });
    }

    const storedToken = await RefreshToken.findByIdAndDelete(
      new mongoose.Types.ObjectId(decoded.tokenId)
    );
    if (!storedToken) {
      return res.status(404).json({ error: "Refresh token is unavailable!" });
    }

    const user = await UserModel.findOne({ _id: storedToken.user });
    if (!user) {
      return res.status(404).json({ error: "Refresh token is unavailable!" });
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = await user.generateRefreshToken();

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(400).json({
        error: "Token expired!",
      });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({
        error: "Invalid token!",
      });
    }
    return res.status(400).json({ error: err });
  }
};

export default updateTokens;
