import { useMutation } from "@tanstack/react-query";
import { editVenue } from "../api/venues";
import { useQueryClient } from "@tanstack/react-query";

export default function useUpdateVenue({ id, setError, onUpdateSuccess }) {
  const queryClient = useQueryClient();
  const updateVenueMutation = useMutation({
    mutationFn: editVenue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue", id] });
      onUpdateSuccess();
    },
    onError: (res) => {
      setError("root", {
        errors: res.response.data.errors,
      });
    },
  });

  return { updateVenueMutation };
}
