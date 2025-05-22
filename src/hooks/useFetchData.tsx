import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function useFetchData<T>(url: string, path: number | null = null) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/${url}/${path ?? ""}`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to fetch");
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [path, url]);

  return {
    data,
    isLoading,
    error,
  };
}

export default useFetchData;
