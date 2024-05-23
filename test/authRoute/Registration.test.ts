import { describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectMockDatabase, disconnectMockDatabase } from "../utils/MockMongoLoader";
import decodeAccessToken from "../utils/JwtTokenHelper";
import { registerWithEmail } from "../api/AuthApis";
import { USER_EMAIL, USER_PASSWORD } from "../api/UserCredentials";
import { getMyProfile } from "../api/UsersApis";

/**
 * Registration User Tests
 *
 * To run only this tests:
 * npm run test -- Registration.test.ts
 */
describe("Run Registration Tests", () => {
  let mongoDadabase: MongoMemoryServer;

  beforeAll(async () => {
    mongoDadabase = await connectMockDatabase();
  });

  afterAll(async () => {
    disconnectMockDatabase(mongoDadabase);
  });

  test("Registration Testing - Success registration", async () => {
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

  test("Registration Testing - Empty body", async () => {
    const response1 = await registerWithEmail({});
    expect(response1.statusCode).toBe(400);
    expect(response1.body.error).toBe(`Field "email" is required`);

    const response2 = await registerWithEmail({ email: "" });
    expect(response2.statusCode).toBe(400);
    expect(response2.body.error).toBe(`"email" is not allowed to be empty`);

    const response3 = await registerWithEmail({ email: USER_EMAIL, password: "" });
    expect(response3.statusCode).toBe(400);
    expect(response3.body.error).toBe(`"password" is not allowed to be empty`);

    const response4 = await registerWithEmail({ email: USER_EMAIL, password: USER_PASSWORD, name: "Some Name" });
    expect(response4.statusCode).toBe(400);
    expect(response4.body.error).toBe(`"name" is not allowed`);
  });

  test("Registration Testing - Invalid email", async () => {
    const response = await registerWithEmail({
      email: "testgmail.com",
      password: "123456789Aa*",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Wrong email format");
  });

  test("Registration Testing - Invalid password", async () => {
    const invalidPassword1 = "1234567";
    const invalidPassword2 = "12345678Aa";
    const invalidPassword3 = "12345678*";
    const invalidPassword4 = "qwertyQwerty*";

    //[A-Za-z\d@$!%*#?&]{8,}
    const response1 = await registerWithEmail({
      email: "testloin@gmail.com",
      password: invalidPassword1,
    });

    expect(response1.statusCode).toBe(400);
    expect(response1.body.error).toBe(
      `"password" with value "${invalidPassword1}" fails to match the required pattern: /^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$/`
    );

    //(?=.*[@$!%*#?&])
    const response2 = await registerWithEmail({
      email: "testloin@gmail.com",
      password: invalidPassword2,
    });

    expect(response2.statusCode).toBe(400);
    expect(response2.body.error).toBe(
      `"password" with value "${invalidPassword2}" fails to match the required pattern: /^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$/`
    );

    //(?=.*[A-Za-z])
    const response3 = await registerWithEmail({
      email: "testloin@gmail.com",
      password: invalidPassword3,
    });

    expect(response3.statusCode).toBe(400);
    expect(response3.body.error).toBe(
      `"password" with value "${invalidPassword3}" fails to match the required pattern: /^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$/`
    );

    //(?=.*\d)
    const response4 = await registerWithEmail({
      email: "testloin@gmail.com",
      password: invalidPassword4,
    });

    expect(response4.statusCode).toBe(400);
    expect(response4.body.error).toBe(
      `"password" with value "${invalidPassword4}" fails to match the required pattern: /^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$/`
    );
  });

  test("Registration Testing - Existing User (second registration with same email)", async () => {
    const email = "sameemail@gmail.com";
    const password = "12345678Aa*";

    const response1 = await registerWithEmail({
      email,
      password,
    });

    expect(response1.status).toBe(200);

    const response2 = await registerWithEmail({
      email,
      password,
    });

    expect(response2.status).toBe(400);
    expect(response2.body.error).toBe("Something went wrong");
  });

  test("Registration Testing - Access token (timeline, data)", async () => {
    const registrationResponse = await registerWithEmail({
      email: "someuser@gmail.com",
      password: "1234567Qq*",
    });

    expect(registrationResponse.statusCode).toBe(200);
    expect(registrationResponse.body).toHaveProperty("accessToken");

    const accessToken = registrationResponse.body.accessToken;
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
    expect(getMyProfileResponse1.body.email).toBe("someuser@gmail.com");
    expect(getMyProfileResponse1.body).toHaveProperty("createdAt");
    expect(getMyProfileResponse1.body).toHaveProperty("updatedAt");

    jest.spyOn(Date, "now").mockImplementationOnce(() => expirationTime);

    // Test getMyProfile with invalid token
    const getMyProfileResponse2 = await getMyProfile(accessToken);
    expect(getMyProfileResponse2.statusCode).toBe(401);
    expect(getMyProfileResponse2.body.error).toBe("The user is not authorized");
  });
});
