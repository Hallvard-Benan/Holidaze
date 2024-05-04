import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createVenue } from "../api/venues";
import { useBoundStore } from "../stores/store";

export default function useCreateVenue() {
  const navigate = useNavigate();
  const { clearVenueForm } = useBoundStore();
  const createVenueMutation = useMutation({
    mutationFn: createVenue,
    onSuccess: (res) => {
      clearVenueForm();
      navigate(`/venues/${res.data.data.id}`);
    },
  });

  return { createVenueMutation };
}
