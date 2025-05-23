// hooks/useFlightEditForm.ts
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useFetchData from "@/hooks/useFetchData";
import { useAppContext } from "@/hooks/useAppContext";
import type { AirportsResponseItem } from "@/types/Airports";
import type { FlightDetail, FlightFormData } from "@/types/Flight";

export function useFlightEditForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const flightId = Number(id);
  const { adminId } = useAppContext();

  const requiredHeaders = useMemo(
    () => ({ "user-id": String(adminId) }),
    [adminId]
  );

  const headers = useMemo(() => ({}), []);

  const {
    data: flight,
    isLoading: isFlightLoading,
    error: flightError,
  } = useFetchData<FlightDetail>("flights", flightId, null, requiredHeaders);

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

  const [form, setForm] = useState<FlightFormData | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (flight) {
      setForm({
        departure_airport_id: String(flight.departure_airport_id),
        arrival_airport_id: String(flight.arrival_airport_id),
        flight_date: flight.flight_date.slice(0, 16),
        arrival_date: flight.arrival_date.slice(0, 16),
        aircraft: flight.aircraft,
        econom_free_seats: String(flight.econom_free_seats),
        business_free_seats: String(flight.business_free_seats),
        econom_price: String(flight.econom_price),
        business_price: String(flight.business_price),
      });
    }
  }, [flight]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/flights/${flightId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            departure_airport_id: Number(form.departure_airport_id),
            arrival_airport_id: Number(form.arrival_airport_id),
            econom_free_seats: Number(form.econom_free_seats),
            business_free_seats: Number(form.business_free_seats),
            econom_price: parseFloat(form.econom_price),
            business_price: parseFloat(form.business_price),
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to update flight");
      }

      navigate("/flights");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    isSubmitting,
    isFlightLoading,
    flightError,
    airportError,
    aircraftError,
    airports,
    aircrafts,
    submitError,
    loadingAirports,
    loadingAircrafts,
  };
}
