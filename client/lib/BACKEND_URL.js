const BACKEND_URL = "http://localhost:4000/api";
export default BACKEND_URL;

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken")?.replace(/^"|"$/g, "") || null;
  }
  return null;
};
