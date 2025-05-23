import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import useFetchData from "@/hooks/useFetchData";
import { useAppContext } from "@/hooks/useAppContext";
import type { AirportsResponseItem } from "@/types/Airports";
import type { FlightFormData } from "@/types/Flight";

export function useFlightCreateForm() {
  const navigate = useNavigate();
  const { adminId } = useAppContext();

  const headers = useMemo(() => ({}), []);
  const userHeader = useMemo(() => ({ "user-id": String(adminId) }), [adminId]);

  const {
    data: airports,
    isLoading: loadingAirports,
    error: airportError,
  } = useFetchData<AirportsResponseItem[]>("airports", null, null, headers);

  const {
    data: aircrafts,
    isLoading: loadingAircrafts,
    error: aircraftError,
  } = useFetchData<string[]>("enum/aircrafts", null, null, headers);

  const [form, setForm] = useState<FlightFormData>({
    departure_airport_id: "",
    arrival_airport_id: "",
    flight_date: "",
    arrival_date: "",
    aircraft: "",
    econom_free_seats: "",
    business_free_seats: "",
    econom_price: "",
    business_price: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/flights`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...userHeader,
        },
        body: JSON.stringify({
          ...form,
          departure_airport_id: Number(form.departure_airport_id),
          arrival_airport_id: Number(form.arrival_airport_id),
          econom_free_seats: Number(form.econom_free_seats),
          business_free_seats: Number(form.business_free_seats),
          econom_price: parseFloat(form.econom_price),
          business_price: parseFloat(form.business_price),
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to create flight");
      }

      navigate("/flights");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    isSubmitting,
    airports,
    aircrafts,
    loadingAirports,
    loadingAircrafts,
    airportError,
    aircraftError,
    error,
  };
}
