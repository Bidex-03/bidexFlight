import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";

// Function to fetch airports from Supabase
const fetchAirports = async () => {
  const { data, error } = await supabase.from("airports").select("*");

  if (error) {
    throw new Error(error.message); // Handle error appropriately
  }

  return data; // Return the fetched data
};

// Custom Hook to use Airports
export const useAirports = () => {
  return useQuery({
    queryKey: ["airports"], // The query key for caching purposes
    queryFn: fetchAirports, // The query function that fetches airports from Supabase
    staleTime: 1000 * 60 * 5, // Stale time of 5 minutes
  });
};
