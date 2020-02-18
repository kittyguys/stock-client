import axios from "axios";
import Cookies from "js-cookie";

const baseURL =
  process.env.NODE_ENV === "development" || !process.env.BASE_URL
    ? "http://localhost:8080"
    : process.env.BASE_URL;

const initialOptions = { baseURL };

export default () => {
  const client = axios.create(initialOptions);
  const token = Cookies.get("jwt");
  if (token) {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return client;
};
