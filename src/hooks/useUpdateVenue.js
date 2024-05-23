import { useMutation } from "@tanstack/react-query";
import { editVenue } from "../api/venues";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function useUpdateVenue({ id, onUpdateSuccess }) {
  const queryClient = useQueryClient();
  const [error, setError] = useState();
  const updateVenueMutation = useMutation({
    mutationFn: editVenue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue", id] });
      onUpdateSuccess();
    },
    onError: (res) => {
      setError(res);
    },
  });

  return { updateVenueMutation, error, setError };
}
