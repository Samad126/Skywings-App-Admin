import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import useFetchData from "@/hooks/useFetchData";

export function useAirportCreateForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const headers = useMemo(() => ({}), []);

  const {
    data: cities,
    isLoading: isCitiesLoading,
    error: citiesError,
  } = useFetchData<Array<string>>("enum/cities", null, null, headers);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/airports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, city }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create airport");
      }

      navigate("/airports");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    setName,
    city,
    setCity,
    isSubmitting,
    submitError,
    handleSubmit,
    cities,
    isCitiesLoading,
    citiesError,
  };
}
