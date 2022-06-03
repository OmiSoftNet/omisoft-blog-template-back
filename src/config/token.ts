export const TOKEN_DATA = {
  ACCESS: {
    type: "ACCESS",
    expiresIn: "24h",
  },
  REFRESH: {
    type: "refresh",
    expiresIn: 60 * 60 * 12,
    expiresInRemembered: 60 * 60 * 24 * 30,
  },
};
