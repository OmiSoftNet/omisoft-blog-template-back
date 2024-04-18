export const isDevEnv = (): boolean => {
  return process.env.NODE_ENV === "development";
};
