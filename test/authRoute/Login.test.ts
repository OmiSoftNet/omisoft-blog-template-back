import { describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectMockDatabase, disconnectMockDatabase } from "../utils/MockMongoLoader";
import decodeAccessToken from "../utils/JwtTokenHelper";
import { loginWithEmail, registerWithEmail } from "../api/AuthApis";
import { USER_EMAIL, USER_PASSWORD } from "../api/UserCredentials";
import { getMyProfile } from "../api/UsersApis";

/**
 * Login User Tests
 *
 * To run only this tests:
 * npm run test -- Login.test.ts
 */
describe("Run Login Tests", () => {
  let mongoDadabase: MongoMemoryServer;

  beforeAll(async () => {
    mongoDadabase = await connectMockDatabase();
  });

  afterAll(async () => {
    disconnectMockDatabase(mongoDadabase);
  });

  test("Login Testing - Registration User For Login Testing", async () => {
    const response = await registerWithEmail({
      email: USER_EMAIL,
      password: USER_PASSWORD,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("_id");
    expect(response.body.user).toHaveProperty("email");
    expect(response.body.user.email).toBe(USER_EMAIL);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");
  });

  test("Login Testing - Success login user", async () => {
    const response = await loginWithEmail({
      email: USER_EMAIL,
      password: USER_PASSWORD,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("_id");
    expect(response.body.user).toHaveProperty("email");
    expect(response.body.user.email).toBe(USER_EMAIL);
    expect(response.body.user).toHaveProperty("createdAt");
    expect(response.body.user).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("refreshToken");
  });

  test("Login Testing - Empty body", async () => {
    const response1 = await loginWithEmail({});
    expect(response1.statusCode).toBe(400);
    expect(response1.body.error).toBe(`Field \"email\" is required`);

    const response2 = await loginWithEmail({
      email: "",
    });
    expect(response2.statusCode).toBe(400);
    expect(response2.body.error).toBe(`"email" is not allowed to be empty`);

    const response3 = await loginWithEmail({
      email: USER_EMAIL,
      password: "",
    });
    expect(response3.statusCode).toBe(400);
    expect(response3.body.error).toBe(`"password" is not allowed to be empty`);
  });

  test("Login Testing - Invalid email", async () => {
    const response = await loginWithEmail({
      email: "testloin@gmail.com",
      password: "12345678qA!",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Sorry, credentials are wrong");
  });

  test("Login Testing - Invalid password", async () => {
    const response = await loginWithEmail({
      email: "testlogin@gmail.com",
      password: "1234578qA!",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Sorry, credentials are wrong");
  });

  test("Login Testing - Invalid email or password", async () => {
    const response1 = await loginWithEmail({
      email: "testloin@gmail.com",
      password: "12345678qA!",
    });
    expect(response1.statusCode).toBe(401);
    expect(response1.body.error).toBe("Sorry, credentials are wrong");

    const response2 = await loginWithEmail({
      email: "testlogin@gmail.com",
      password: "1234578qA!",
    });
    expect(response2.statusCode).toBe(401);
    expect(response2.body.error).toBe("Sorry, credentials are wrong");
  });

  test("Login Testing - Access token (timeline, data)", async () => {
    const loginResponse = await loginWithEmail({
      email: USER_EMAIL,
      password: USER_PASSWORD,
    });
    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body).toHaveProperty("accessToken");

    const accessToken = loginResponse.body.accessToken;
    const decodedToken = decodeAccessToken(accessToken);
    const expirationTime =
      decodedToken && typeof decodedToken.exp === "number" ? decodedToken.exp * 1000 : Date.now() + 1000;

    expect(decodedToken).toHaveProperty("_id");
    expect(decodedToken).toHaveProperty("exp");
    expect(decodedToken).toHaveProperty("iat");
    expect(expirationTime).toBeGreaterThan(Date.now());

    // Test getMyProfile with valid token
    const getMyProfileResponse1 = await getMyProfile(accessToken);
    expect(getMyProfileResponse1.statusCode).toBe(200);
    expect(getMyProfileResponse1.body).toHaveProperty("_id");
    expect(getMyProfileResponse1.body).toHaveProperty("email");
    expect(getMyProfileResponse1.body.email).toBe(USER_EMAIL);
    expect(getMyProfileResponse1.body).toHaveProperty("createdAt");
    expect(getMyProfileResponse1.body).toHaveProperty("updatedAt");

    jest.spyOn(Date, "now").mockImplementationOnce(() => expirationTime);

    // Test getMyProfile with invalid token
    const getMyProfileResponse2 = await getMyProfile(accessToken);
    expect(getMyProfileResponse2.statusCode).toBe(401);
    expect(getMyProfileResponse2.body.error).toBe("The user is not authorized");
  });
});
