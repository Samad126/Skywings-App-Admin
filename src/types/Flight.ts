export type FlighDetail = {
  id: number;
  departure_airport_id: number;
  arrival_airport_id: number;
  flight_date: string;
  arrival_date: string;
  aircraft: string;
  econom_free_seats: number;
  business_free_seats: number;
  econom_price: number;
  business_price: number;
};

export type LinkItem = {
  url: string | null;
  label: string | null;
  active: boolean;
};

export type FlightsResponse = {
  current_page: number | null;
  data: FlighDetail[];
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

export type FlightPOSTBody = {
  departure_airport_id: number;
  arrival_airport_id: number;
  flight_date: string; //"2025-05-20T10:00:00Z"
  arrival_date: string; //"2025-05-20T10:00:00Z"
  aircraft: string;
  econom_free_seats: number;
  business_free_seats: number;
  econom_price: number; //can be float
  business_price: number; // can be float
};
