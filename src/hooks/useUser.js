import { getUser } from "../api/profiles";
import { useQuery } from "@tanstack/react-query";
export default function useUser(name) {
  const { data, status, error } = useQuery({
    queryKey: ["user", name],
    queryFn: () => {
      console.log("Fetching user");
      getUser({ name });
    },
  });
  return { data, status, error };
}
