import { fetchVenueById } from "../api/venues";
import { useQuery } from "@tanstack/react-query";
export default function useSingleVenue(id) {
  const { data, status, error } = useQuery({
    queryKey: ["venue", id],
    queryFn: () => fetchVenueById(id),
  });
  return { data, status, error };
}
