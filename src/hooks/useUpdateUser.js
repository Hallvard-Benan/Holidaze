import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../api/profiles";
import { useBoundStore } from "../stores/store";
import { useQueryClient } from "@tanstack/react-query";

export default function useUpdateUser({ setError, name, onSuccess }) {
  const updateUser = useBoundStore((state) => state.updateUser);
  const queryClient = useQueryClient();
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (res) => {
      console.log("success", res);
      updateUser(res.data.data);
      queryClient.invalidateQueries({ queryKey: ["user", name] });
      onSuccess && onSuccess();
    },
    onError: (res) => {
      console.log("error", res);
      setError("root", {
        errors: res.response.data.errors,
      });
    },
  });

  return { updateProfileMutation };
}
