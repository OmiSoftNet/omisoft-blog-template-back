import supertest from "supertest";
import loadServer from "../../src/loaders/ExpressLoader";

const app = loadServer();

const getMyProfile = async (accessToken?: string) => {
  const request = supertest(app).get("/users/my-profile");

  if (accessToken) {
    request.set("Authorization", `Bearer ${accessToken}`);
  }

  return await request;
};

export { getMyProfile };
