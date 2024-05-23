import jwt, { JwtPayload } from "jsonwebtoken";
import CONFIG from "../../src/config";

const decodeAccessToken = (accessToken: string | null): JwtPayload | null => {
  try {
    if (!accessToken) {
      return null;
    }
    return jwt.verify(accessToken, CONFIG.JWT_SECRET) as JwtPayload;
  } catch (error) {
    console.error("Error decoding access token:", error);
    return null;
  }
};

export default decodeAccessToken;
