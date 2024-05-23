export const TEXT = {
  ERRORS: {
    requiredField: (requiredValue: string) => `Field "${requiredValue}" is required`,

    notFound: "Not found",
    unauthorized: "The user is not authorized",
    userDoesntExists: "User not found",
    somethingWentWrong: "Something went wrong",
    incorrectEmailFormat: "Wrong email format",
    userExists: "User already exists",
    roleExists: "This role already exists",
    wrongCredentials: "Sorry, credentials are wrong",
    wrongOldPassword: "Sorry, old password are wrong",
    incorrectPasswordFormat: "Incorrect password format",
    postExists: "Post with the same url already exists",
    postDoesntExists: "Post not found",
    wrongTypeUrl: "Url should contain only small latin letters, numbers, hyphens and underscores",
    duplicateTitle: "Post with the same title already exists",
    methodNotAllowed: "Method Not Allowed",
    noRoute: "Resource not Found",
  },
};
export const JOI_ERRORS = {
  "string.email": "Wrong email format",
  "any.required": "Field {{#label}} is required",
};
