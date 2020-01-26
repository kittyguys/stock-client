import axios from "axios";
import Cookies from "js-cookie";

const request = (
  options: any,
  onSuccess: any,
  onError: any,
  isToken: boolean = true
) => {
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

  const instance = axios.create(initialOptions);

  return instance(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
