const BACKEND_URL = "http://localhost:3000/api";
export default BACKEND_URL;

export const token = typeof window !== 'undefined' 
  ? localStorage.getItem("accessToken")?.replace(/^"|"$/g, "") || "" 
  : "";