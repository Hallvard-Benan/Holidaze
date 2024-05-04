import { getVenuesByUser } from "../api/profiles";
import { useQuery } from "@tanstack/react-query";

export default function useVenuesByProfile(userName) {
  console.log(userName);
  const { data, status, error } = useQuery({
    queryKey: ["venue", userName],
    queryFn: () => getVenuesByUser(userName),
  });
  return { data, status, error };
}
