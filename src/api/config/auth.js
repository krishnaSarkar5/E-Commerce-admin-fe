import axios from "axios";
import { LOGIN_BASE_URL } from "../urls/authurl";
import { getCookies, deleteCookie } from "cookies-next";
// import Logout from "../../Logout";

const instance = axios.create({
  baseURL: LOGIN_BASE_URL,
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // const token = localStorage.getItem("user-token");
    const token = getCookies("token");
    console.log("+++ token ", token);
    config.headers["host"] = "http://localhost:8081";
    if (token) {
      config.headers["Authorization"] = token.token;
    }
    return window.navigator.onLine
      ? config
      : Promise.reject({
          response: {
            data: {
              message: "Check your internet connection",
            },
          },
        });
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("++++ Error: " + error);
    if (error?.response?.status === 401) {
      //   Logout();
      deleteCookie("token");
      window.location.href = "/login";
      return error;
    } else if (
      error?.response?.status === 404 ||
      error?.response?.status === 403 ||
      error?.response?.status === 400
    ) {
      // window.location.href = "/error";
      return error?.response;
    } else {
      // console.log("Axios helper error: " + JSON.stringify(error.response));
      return Promise.reject(error.response);
    }
  }
);

export default instance;
