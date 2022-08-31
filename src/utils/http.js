import axios from "axios";
import { useNavigate } from "react-router";
import Cookies from "./cookie";
let token = localStorage.getItem("setToken");
import i18n from "i18next";
let instance = axios.create({
  headers: {
    contentType: "application/json",
    Authorization: token,
  },
  withCredentials: true,
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("setToken");
    token && (config.headers.Authorization = token);
    return config;
  },
  (error) => {
    loading.hide();
    Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    console.log(response);
    const UNAUTHORIZED = 401;
    const { data } = response;
    if (response.data.code == UNAUTHORIZED) {
      localStorage.clear();
      localStorage.setItem("locale", i18n.language);
      localStorage.removeItem("myVuexs");
      Cookies.deleteCookie("cuessid");
      window.location.href = '/login';
      return;
    } else if (response.data.token) {
      axios.defaults.headers["Authorization"] = response.data.token;
    }
    return data;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default instance;
