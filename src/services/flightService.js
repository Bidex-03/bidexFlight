// This component is currently not in use //
import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";

export const useFlights = (searchCriteria) => {
  console.log("Search criteria:", searchCriteria); // Log the search criteria
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
      .eq("departure_city", from) // Match the from field
      .eq("destination_city", to) // Match the to field
      .gte("departure_time", departureDate) // Flights on or after the departure date
      .lte("return_time", returnDate); // Flights on or before the return date

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Error fetching flights");
    }

    console.log("Fetched flights:", data);
    return data;
  } catch (err) {
    console.error("Error in fetchFlights:", err);
    throw err; // Ensure error is thrown so that `isError` is triggered
  }
};
