import { fetchVenueById } from "../api";
import { useQuery } from "@tanstack/react-query";
export default function useSingleVenue(id) {
  const { data, status, error } = useQuery({
    queryKey: ["venue", id],
    queryFn: () => fetchVenueById(id),
  });
  return { data, status, error };
}
