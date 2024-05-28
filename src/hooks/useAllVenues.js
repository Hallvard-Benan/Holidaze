import { useQuery } from "@tanstack/react-query";
import { fetchAllVenues } from "../api/venues";

export default function useAllVenues({ perPage, pageNumber }) {
  const { data, status, error } = useQuery({
    queryKey: ["venues", pageNumber, perPage],
    queryFn: () => fetchAllVenues({ pageParam: pageNumber, perPage }),
  });

  return { data, status, error };
}
