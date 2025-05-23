import { useEffect, useState, useCallback, useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function useFetchData<T>(
  url: string,
  path: number | null = null,
  query: string | null = null,
  headers: Record<string, string> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initialLoadDone = useRef(false);

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    if (!initialLoadDone.current) setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/${url}/${path ?? ""}${query ? `?${query}` : ""}`,
        { headers }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch");
      }

      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsFetching(false);
      setIsLoading(false);
      initialLoadDone.current = true;
    }
  }, [url, path, query, headers]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch: fetchData,
  };
}