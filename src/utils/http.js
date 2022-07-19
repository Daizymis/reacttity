import axios from 'axios';
import Cookies from './cookie';
import { createBrowserHistory } from 'history';
let token = localStorage.getItem("setToken");
const instance = axios.create({
    headers: {
        contentType: "application/json",
        Authorization: token,
    },
    withCredentials: true,
});
instance.interceptors.request.use((config) => {
    return config;
}, (error) => {
    loading.hide();
    Promise.reject(error);
});
instance.interceptors.response.use((response) => {
    const UNAUTHORIZED = 401;
    const { data } = response;
    if (response.data.code == UNAUTHORIZED) {
        localStorage.clear();
        localStorage.setItem('i18n-locale', i18n.locale);
        localStorage.removeItem("myVuexs");
        Cookies.deleteCookie("cuessid");
        return;
    }
        let history = createBrowserHistory()
        history.push("/menu");
    return data;
}, error =>{
    Promise.reject(error);
})
export default instance;