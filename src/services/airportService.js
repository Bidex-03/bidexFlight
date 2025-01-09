import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase";

// Function to fetch airports from Supabase
const fetchAirports = async () => {
  const { data, error } = await supabase.from("airports").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Custom Hook to use Airports
export const useAirports = () => {
  return useQuery({
    queryKey: ["airports"],
    queryFn: fetchAirports,
    staleTime: 1000 * 60 * 5,
  });
};
