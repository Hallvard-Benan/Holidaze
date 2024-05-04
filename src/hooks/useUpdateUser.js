import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../api/profiles";
import { useBoundStore } from "../stores/store";
import { useQueryClient } from "@tanstack/react-query";

export default function useUpdateUser({ setError, name }) {
  const updateUser = useBoundStore((state) => state.updateUser);
  const { invalidateQueries } = useQueryClient();
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (res) => {
      updateUser(res.data.data);
      invalidateQueries({ queryKey: ["user", name] });
    },
    onError: (res) => {
      setError("root", {
        errors: res.response.data.errors,
      });
    },
  });

  return { updateProfileMutation };
}
