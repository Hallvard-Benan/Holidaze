import { searchVenues } from "../api";
import { useQuery } from "@tanstack/react-query";
export default function useSearchVenues(search) {
  const { data, status, error } = useQuery({
    queryKey: ["venues", search],
    queryFn: () => searchVenues(search),
  });
  return { data, status, error };
}
