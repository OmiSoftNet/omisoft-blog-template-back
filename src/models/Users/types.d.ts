export interface IUser {
  _id: string;
  email: string;
  hashedPassword: string;
  role: string;
  validatePassword: (password: string) => boolean;
  setPassword: (password: string) => string;
  generateAccessToken: () => string;
  generateRefreshJWT: () => string;
  createdAt: string;
  updatedAt: string;
}
