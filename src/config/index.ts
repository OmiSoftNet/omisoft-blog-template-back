import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

const CONFIG = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  MONGODB_CLUSTER_URL: process.env.MONGODB_CLUSTER_URL ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "JEST_JWT_SECRET",

  NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL ?? "",
  NODEMAILER_IMAP_PASSWORD: process.env.NODEMAILER_IMAP_PASSWORD ?? "",
  CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:3000",
};

export default CONFIG;
