import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

axios.defaults.baseURL = BASE_URL;

const instance = axios.create();

instance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem("session_id");
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    };
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

export interface ParamsType {
  [key: string]: any;
}

const Api = {
  post(endPoint: string, param: ParamsType): Promise<AxiosResponse> {
    const params = {
      ...param,
      api_key: API_KEY,
      session_id: localStorage.getItem("session_id"),
    };
    return instance.post(endPoint, params);
  },
  get(endPoint: string, param?: ParamsType): Promise<AxiosResponse> {
    const params = {
      ...param,
      api_key: API_KEY,
      session_id: localStorage.getItem("session_id"),
    };
    return instance.get(endPoint, { params });
  },
};

export default Api;
