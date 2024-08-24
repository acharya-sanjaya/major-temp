import {useState} from "react";
import {bookData} from "../utils/data";

type FetchFunction<T> = (data?: T) => Promise<T>;

interface SimulatedFetchResult<T> {
  fetchData: FetchFunction<T>;
  loading: boolean;
  error: Error | null;
}

const useSimulatedFetch = <T>(url: string): SimulatedFetchResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  const fetchData: FetchFunction<T> = async (data) => {
    setLoading(true);
    setError(null);

    data;
    let response: T = {ok: null, data: []} as T;

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    const simulateNetworkDelay = () => new Promise<void>((resolve) => setTimeout(resolve, 500));

    try {
      await simulateNetworkDelay();

      if (url === "api/books") {
        response = {ok: true, data: bookData} as T;
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
    return response;
  };

  return {fetchData, loading, error};
};

export default useSimulatedFetch;
