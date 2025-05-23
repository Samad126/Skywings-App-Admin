import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableContainer,
  TableBody,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Pagination,
} from "@mui/material";
import { useSearchParams, useNavigate } from "react-router";
import { useAppContext } from "@/hooks/useAppContext";
import type { FlightsResponse } from "@/types/Flight";
import useFetchData from "@/hooks/useFetchData";
import TableHeader from "@/components/Flights/TableHead";
import TableRow from "@/components/Flights/TableRow";

export default function FlightsIndex() {
  const { adminId } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const initialDate = searchParams.get("date") ?? today;
  const initialPage = parseInt(searchParams.get("page") ?? "1", 10);

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [page, setPage] = useState(initialPage);

  const query = `date=${selectedDate}&page=${page}`;
  const headers = useMemo(() => ({ "user-id": String(adminId) }), [adminId]);

  const {
    data: flights,
    isLoading,
    error,
    refetch,
  } = useFetchData<FlightsResponse>("flights", null, query, headers);

  const flightsArr = flights?.data || [];

  useEffect(() => {
    setSearchParams({ date: selectedDate, page: String(page) });
  }, [selectedDate, page, setSearchParams]);

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4">Flights by Date</Typography>
        <Button variant="contained" onClick={() => navigate("create")}>
          Create Flight
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <TextField
          label="Flight Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setPage(1);
          }}
        />
      </Box>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!isLoading && flights && (
        <>
          <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 1100 }}>
              <TableHeader />
              <TableBody>
                {flightsArr.map((f) => (
                  <TableRow
                    key={f.id}
                    adminId={adminId}
                    flight={f}
                    refetch={refetch}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={flights.last_page ?? 1}
              page={flights.current_page ?? 1}
              onChange={(_, v) => setPage(v)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
}
