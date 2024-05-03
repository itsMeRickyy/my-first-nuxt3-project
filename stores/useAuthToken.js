export const useAuthToken = () => {
  return useState("token", () => null);
};
