import {useState, useEffect} from "react";
import useAuth from "./useAuth";

type FetchState<T> = {
  fetchedData: T;
  loading: boolean;
  error: string | null;
};

export default function useFetch<T>(url: string, defaultValue: T): FetchState<T> {
  const [fetchedData, setFetchedData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {authToken} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result: T = await response.json();
        setFetchedData(result);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setFetchedData(defaultValue);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, authToken]);

  return {fetchedData, loading, error};
}
