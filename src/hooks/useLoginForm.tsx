import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppContext } from "@/hooks/useAppContext";
import type {
  FormSubmitType,
  Login200Response,
  Login401Response,
  Login422Response,
} from "@/types/Login";

const API_URL: string = import.meta.env.VITE_API_URL;

export function useLoginForm() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { updateAdminState } = useAppContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as FormSubmitType;

    try {
      const res = await fetch(`${API_URL}/admin/signIn/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 401) {
          const result = (await res.json()) as Login401Response;
          setError(result.message);
        } else if (res.status === 422) {
          const result = (await res.json()) as Login422Response;
          setError(result.errors.password.join(" "));
        } else {
          const fallback = await res.text();
          setError(fallback);
        }
        return;
      }

      const result = (await res.json()) as Login200Response;
      updateAdminState(result.data);
      navigate("/");
    } catch {
      setError("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError("");

  return {
    handleSubmit,
    clearError,
    loading,
    error,
  };
}
