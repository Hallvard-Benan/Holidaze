import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createVenue } from "../api/venues";
import { useBoundStore } from "../stores/store";
import { useState } from "react";

export default function useCreateVenue() {
  const queryClient = useQueryClient();
  const name = useBoundStore((state) => state.user.name);
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { clearVenueForm } = useBoundStore();
  const createVenueMutation = useMutation({
    mutationFn: createVenue,
    onSuccess: (res) => {
      clearVenueForm();
      queryClient.invalidateQueries({ queryKey: ["user", name] });
      navigate(`/venues/${res.data.data.id}`);
    },
    onError: (err) => {
      console.log(err);
      setError(err);
    },
  });

  return { createVenueMutation, error, setError };
}
