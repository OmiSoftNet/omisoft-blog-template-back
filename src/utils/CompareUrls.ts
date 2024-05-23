export const compareUrls = (availableUrl: string, targetUrl: string): boolean => {
  const regexPattern = availableUrl.replace(/:[^\/]+/g, "[^/]+");
  const regex = new RegExp(`^${regexPattern}`);
  return regex.test(targetUrl);
};
