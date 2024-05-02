import { useQuery } from "@tanstack/react-query";
import { fetchAllVenues } from "../api/venues";
export default function useAllVenues() {
  const { data, status, error } = useQuery({
    queryKey: ["venues"],
    queryFn: () => fetchAllVenues(),
  });
  return { data, status, error };
}
