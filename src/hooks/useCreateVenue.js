import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createVenue } from "../api";
import { useBoundStore } from "../stores/store";

export default function useCreateVenue({ setError }) {
  const navigate = useNavigate();
  const { clearVenueForm } = useBoundStore();
  const createVenueMutation = useMutation({
    mutationFn: createVenue,
    onSuccess: (res) => {
      setError("root", { errors: [] });
      clearVenueForm();
      navigate(`/venues/${res.data.data.id}`);
    },
    onError: (res) => {
      setError("root", {
        errors: res.response.data.errors,
      });
    },
  });

  return { createVenueMutation };
}
