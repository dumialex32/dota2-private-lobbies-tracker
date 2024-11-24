import axios from "axios";

// create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: "",
  timeout: 10000, // timeout for requests
});

// add a response interceptor for centralized error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // customize messages based on status codes
      error.message =
        error.response.data?.message || // Server-provided message
        (error.response.status === 404
          ? "Resource not found"
          : "An error occurred on the server.");
    } else if (error.request) {
      error.message = "No response from server. Please check your network.";
    } else {
      error.message = "An unexpected error occurred. Please try again.";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
