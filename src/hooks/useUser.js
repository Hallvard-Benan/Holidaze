import { getUser } from "../api/profiles";
import { useQuery } from "@tanstack/react-query";
export default function useUser(name) {
  const { data, status, error } = useQuery({
    queryKey: ["venues", name],
    queryFn: () => getUser(name),
  });
  return { data, status, error };
}
