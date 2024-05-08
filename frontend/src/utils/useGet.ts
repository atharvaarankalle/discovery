import axios, { AxiosError } from "axios";
import { useState, useEffect, useRef } from "react";

/**
 * @function useGet() hook
 * Fetches data from the given URL.
 *
 * @param T the type of data returned by the API
 * @param object containing:
 *  the url - required string defining the path of the desired URL to GET from,
 *  the initialState - (optional) the data to get - initially null,
 *  the queryParams - (optional) the query parameters to send with the GET request
 *
 * @returns An object containing:
 *  the desired data,
 *  whether the data is still being loaded or not,
 *  a function to call to refresh the data, i.e. redo the GET request to the same URL (if URL hasn't changed),
 *  an AxiosError object with error information
 */
const useGet = <T>({
  url,
  initialState = null,
  queryParams = {},
}: {
  url: string;
  initialState?: T | null;
  queryParams?: Record<string, unknown>;
}) => {
  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [refreshToggle, setRefreshToggle] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>();

  // To prevent unnecessary re-rendering due to queryParams
  const queryParamsRef = useRef(queryParams);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
          params: queryParamsRef.current,
        });
        setData(response?.data);
      } catch (error) {
        setError(error as AxiosError);
        // also catches cancel error when API request no longer needs to be made
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      source.cancel("Request cancelled by cleanup");
    };
  }, [url, refreshToggle, queryParamsRef]);

  const refresh = () => {
    setRefreshToggle(!refreshToggle);
  };

  return { isLoading, data, refresh, error };
};

export default useGet;
