import axiosInstance from "axios";
import APP_CONSTANTS from '../../constants/appConstants';

const axios = axiosInstance.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-type": "application/json"
    }
});

var axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
    }
};

export const login = async (username, password) => {
    let param = {
        "username": username,
        "password": password
    }
    let rs = await axiosInstance.post("http://localhost:3000/api/admins/login", param, axiosConfig)
    return rs;
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const userToken = localStorage.getItem(APP_CONSTANTS.USER_TOKEN)

    if (userToken) {
        axiosConfig[APP_CONSTANTS.USER_TOKEN] = userToken
    }

    config.axiosConfig.common = axiosConfig

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axios
