import axios from "axios";

const baseURL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL,
  timeout: 1000000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      // console.error("Invalid user data in localStorage");
      localStorage.removeItem("user");
    }

    // console.log(`REQUEST -> ${config.method?.toUpperCase()} ${config.url}`);

    return config;
  },
  (error) => {
    // console.error("Request Error:", error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(`RESPONSE <- ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";
    const message = error.response?.data?.message || "Something went wrong";

    // console.error(`ERROR ${status}: ${message}`);

    if (status === 401) {
      const isLoginRequest = requestUrl.includes("/loginapi/login");

      if (isLoginRequest) {
        return Promise.reject(error);
      }

      console.warn("Session expired. Logging out...");
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      if (window.location.pathname !== "/Login") {
        window.location.href = "/Login";
      }
    }

    if (status === 403) {
      alert("You do not have permission to access this page.");
    }

    if (status === 500) {
      alert("Server error. Please try again later.");
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
