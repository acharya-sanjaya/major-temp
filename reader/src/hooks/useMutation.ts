import {useState} from "react";

interface MutationResult<T> {
  mutate: (data: T | FormData, method?: string) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const useMutation = <T>(url: string, token?: string): MutationResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: T | FormData, method: string = "POST") => {
    setLoading(true);
    setError(null);

    try {
      const isFormData = data instanceof FormData;

      const response = await fetch(url, {
        method,
        headers: {
          ...(token ? {Authorization: `Bearer ${token}`} : {}),
          ...(isFormData ? {} : {"Content-Type": "application/json"}),
        },
        body: isFormData ? data : JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return {mutate, loading, error};
};

export default useMutation;
