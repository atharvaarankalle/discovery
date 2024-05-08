import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * @function useAxiosInterceptor() hook
 *
 * if the authToken cookie stored in the frontend expires, any 401 responses from our API
 * endpoint requests using axios will redirect the user to the login page to login again.
 *
 * If not a 401 error, it will log this to the console as an error. You can implement more error
 * handling when using axios for requests, but no need to handle 401.
 *
 */
const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // checking if error status is 401 (unauthorised)
        if ((error as AxiosError).response?.status === 401) {
          console.log("Unauthorized Error. Redirecting to login page...");
          // navigate user to login
          navigate("/login");
        } else {
          console.error("There was a problem fetching the message:", error);
        }
        return Promise.reject(error);
      }
    );

    // cleaning up axios interceptor when component unmounts
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);
};

export default useAxiosInterceptor;
