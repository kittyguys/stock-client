import axios from "axios";
import Cookies from "js-cookie";

type InitialOptions = {
  baseURL: string;
  headers: { Authorization?: string; "Content-Type"?: string };
};

export const createInstance = (options: any = {}) => {
  const baseURL =
    process.env.NODE_ENV === "development" || !process.env.BASE_URL
      ? "http://localhost:8080"
      : process.env.BASE_URL;
  const initialOptions: InitialOptions = { baseURL, ...options };
  const token = Cookies.get("jwt");

  if (token) {
    if (initialOptions.hasOwnProperty("headers")) {
      initialOptions.headers.Authorization = `Bearer ${token}`;
    } else {
      initialOptions.headers = { Authorization: `Bearer ${token}` };
    }
  }

  return axios.create(initialOptions);
};
