import axios from "axios";
import { useNavigate } from "react-router";
import Cookies from "./cookie";
let token = localStorage.getItem("setToken");
import i18n from "i18next";
const url = process.env.NODE_ENV === 'development' ? '' : '';
console.log(url);
let instance = axios.create({
  headers: {
    contentType: "application/json",
    Authorization: token,
  },
  withCredentials: true,
});
instance.interceptors.request.use(
  (config) => {
    console.log(config);
    const token = localStorage.getItem("setToken");
    token && (config.headers.Authorization = token);
    if(url && config.url.indexOf('api') > -1){
      config.url = config.url.slice(4);
    }
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
    const { data, data:{code, token} } = response;
    if (code == UNAUTHORIZED) {
      localStorage.clear();
      localStorage.setItem("locale", i18n.language);
      localStorage.removeItem("myVuexs");
      Cookies.deleteCookie("cuessid");
      window.location.href = '/login';
      return;
    } else if (token) {
      axios.defaults.headers["Authorization"] = token;
    }
    return data;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default instance;
