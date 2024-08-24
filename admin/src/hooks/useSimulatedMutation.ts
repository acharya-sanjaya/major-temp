import {useState} from "react";
import {bookData} from "../utils/data"; // Assuming bookData is an array of BookType

type MutationFunction<T> = (data: T, method: "POST" | "PUT" | "DELETE") => Promise<void>;

interface SimulatedMutationResult<T> {
  mutate: MutationFunction<T>;
  loading: boolean;
  error: Error | null;
}

const useSimulatedMutation = <T>(url: string): SimulatedMutationResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  const mutate: MutationFunction<T> = async (data, method) => {
    setLoading(true);
    setError(null);

    let response: {ok: boolean | undefined; data: any | undefined};

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    const simulateNetworkDelay = () => new Promise<void>((resolve) => setTimeout(resolve, 3000));

    try {
      await simulateNetworkDelay();

      if (url === "api/books") {
        response = {ok: true, data: bookData};
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return {mutate, loading, error};
};

export default useSimulatedMutation;
