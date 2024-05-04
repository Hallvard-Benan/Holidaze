import { useMutation } from "@tanstack/react-query";
import { editVenue } from "../api/venues";
import { useQueryClient } from "@tanstack/react-query";

export default function useUpdateVenue({ id, setError }) {
  const { invalidateQueries } = useQueryClient();
  const updateVenueMutation = useMutation({
    mutationFn: editVenue,
    onSuccess: () => {
      invalidateQueries({ queryKey: ["venue", id] });
    },
    onError: (res) => {
      setError("root", {
        errors: res.response.data.errors,
      });
    },
  });

  return { updateVenueMutation };
}
