import axios from "axios";
import { useState, useEffect } from "react";

/**
 * @function useGet() hook
 * Fetches data from the given URL.
 *
 * @param T the type of data returned by the API
 * @param url, required string defining the path of the desired URL to GET from
 * @param initialState the data to get, initially null
 *
 * @returns An object containing:
 *  the desired data,
 *  whether the data is still being loaded or not,
 *  a function to call to refresh the data, i.e. redo the GET request to the same URL (if URL hasn't changed)
 */
const useGet = <T>(url: string, initialState: T | null = null) => {
  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [refreshToggle, setRefreshToggle] = useState<boolean>(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        setData(response?.data);
      } catch (error) {
        // catch cancel error when API request no longer needs to be made
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      source.cancel("Request cancelled by cleanup");
    };
  }, [url, refreshToggle]);

  const refresh = () => {
    setRefreshToggle(!refreshToggle);
  };
  return { isLoading, data, refresh };
};

export default useGet;
