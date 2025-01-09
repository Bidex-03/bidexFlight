// This component is currently not in use //
import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";

export const useFlights = (searchCriteria) => {
  console.log("Search criteria:", searchCriteria);
  return useQuery(["flights", searchCriteria], () =>
    fetchFlights(searchCriteria)
  );
};

// Fetch flights that match the search criteria from Supabase
const fetchFlights = async ({ from, to, departureDate, returnDate }) => {
  try {
    console.log("Fetching flights with:", {
      from,
      to,
      departureDate,
      returnDate,
    });

    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .eq("departure_city", from)
      .eq("destination_city", to)
      .gte("departure_time", departureDate)
      .lte("return_time", returnDate);

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Error fetching flights");
    }

    console.log("Fetched flights:", data);
    return data;
  } catch (err) {
    console.error("Error in fetchFlights:", err);
    throw err;
  }
};
