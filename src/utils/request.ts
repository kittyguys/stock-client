import axios from "axios";
import Cookies from "js-cookie";

export const createInstance = (isToken: boolean = true, options: any = {}) => {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : process.env.BASE_URL;

  const initialOptions: {
    baseURL: string;
    headers?: { Authorization: string };
  } = { baseURL };

  if (isToken) {
    const token = Cookies.get("jwt");
    initialOptions.headers = { Authorization: `Bearer ${token}` };
  }

  return axios.create({ ...initialOptions, ...options });
};
