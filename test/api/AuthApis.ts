import supertest from "supertest";
import loadServer from "../../src/loaders/express.loader";

const app = loadServer();

type UserBody = {
  email?: string;
  password?: string;
  name?: string;
};

type FinishRegistrationBody = {
  nickname?: string;
  countryCode?: string;
};

type RefreshTokenBody = {
  refreshToken?: string;
};

const registerWithEmail = async (body: UserBody | undefined) => {
  return await supertest(app).post("/auth/registration").send(body);
};

const finishRegistration = async (body: FinishRegistrationBody | undefined) => {
  return await supertest(app).post("/auth/registration").send(body);
};

const loginWithEmail = async (body: UserBody | undefined) => {
  return await supertest(app).post("/auth/login").send(body);
};

const doRefreshToken = async (body: RefreshTokenBody | undefined) => {
  return await supertest(app).post("/auth/refresh-token").send(body);
};

export { registerWithEmail, finishRegistration, loginWithEmail, doRefreshToken };
