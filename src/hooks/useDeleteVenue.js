import { useMutation } from "@tanstack/react-query";
import { deleteVenue } from "../api/venues";
import { useNavigate } from "react-router-dom";
export default function useDeleteVenue() {
  const navigate = useNavigate();
  const deleteMutation = useMutation({
    mutationFn: deleteVenue,
    onSuccess: () => {
      navigate("/");
    },
  });

  return { deleteMutation };
}
