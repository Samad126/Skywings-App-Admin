export type FlightBase = {
  id: number;
  departure_airport_id: string;
  arrival_airport_id: string;
  flight_date: string;
  arrival_date: string;
  aircraft: string;
  econom_free_seats: string;
  business_free_seats: string;
  econom_price: string;
  business_price: string;
};

export type FlightFormData = Omit<FlightBase, "id">;

export type FlightDetail = FlightBase & {
  departure_city: string;
  departure_airport_name: string;
  arrival_city: string;
  arrival_airport_name: string;
  total_seats: number;
  booked_seats: string;
  flight_number: string;
  created_at: string;
  updated_at: string;
  econom_price: string;
  business_price: string;
};

export type LinkItem = {
  url: string | null;
  label: string | null;
  active: boolean;
};

export type FlightsResponse = {
  current_page: number | null;
  data: FlightDetail[];
  first_page_url: string | null;
  from: null;
  last_page: number | null;
  last_page_url: string | null;
  links: [
    {
      url: null;
      label: "&laquo; Previous";
      active: false;
    },
    {
      url: "http://skywings.alakx.com/api/flights?page=1";
      label: "1";
      active: true;
    },
    {
      url: null;
      label: "Next &raquo;";
      active: false;
    }
  ];
  next_page_url: string | null;
  path: string | null;
  per_page: number | null;
  prev_page_url: string | null;
  to: null;
  total: number | null;
};
