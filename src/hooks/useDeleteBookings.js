import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../api/bookings";
import { useBoundStore } from "../stores/store";
export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const name = useBoundStore((state) => state.user.name);

  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", name] });
    },
  });

  return { deleteMutation };
}
