import config from "@/config";
import axios, { type AxiosRequestConfig } from "axios"

export const axiosInstance = axios.create({
      baseURL: config.baseUrl,
      withCredentials: true
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
      // Do something before request is sent
      return config;
}, function (error) {
      // Do something with request error
      return Promise.reject(error);
}
);

let isRefreshing = false;
let pendingQueue: {
      resolve: (value: unknown) => void;
      reject: (value: unknown) => void;
}[] = [];

const processQueue = (err: unknown) => {
      pendingQueue.forEach((promise) => {
            if (err) {
                  promise.reject(err)
            } else {
                  promise.resolve(null)
            }
      });

      pendingQueue = []
}

axiosInstance.interceptors.response.use(
      (response) => { return response; },
      async (error) => {
            const originalRequest = error.config as AxiosRequestConfig & { _retry: boolean };

            if (error.status === 500 && error.response.data.message === "jwt expired" && !originalRequest._retry) {
                  console.log("Your token is expired");
                  originalRequest._retry = true;

                  if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                              pendingQueue.push({ resolve, reject })
                        })
                              .then(() => axiosInstance(originalRequest))
                              .catch((err) => Promise.reject(err))
                  }
                  isRefreshing = true;
                  try {
                        const res = await axiosInstance.post("/auth/refresh-token");
                        console.log(res);
                        return axiosInstance(originalRequest)
                  } catch (err) {
                        processQueue(err);
                        return Promise.reject(err)
                  } finally {
                        isRefreshing = false
                  }
            };
            return Promise.reject(error);
      });
