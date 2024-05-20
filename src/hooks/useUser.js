import { getUser } from "../api/profiles";
import { useQuery } from "@tanstack/react-query";

export default function useUser(name) {
  const { data, status, error } = useQuery({
    queryKey: ["user", name],
    queryFn: () => {
      console.log("getting user");
      return getUser({ name });
    },
    enabled: !!name,
  });

  return { data, status, error };
}
