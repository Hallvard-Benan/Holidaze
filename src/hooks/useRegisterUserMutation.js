import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth";
import { toast } from "sonner";

export default function useRegisterMutation({
  formData,
  loginUserMutation,
  setError,
}) {
  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      const loginDetails = {
        email: formData.email,
        password: formData.password,
      };
      toast.success("Registration successful");

      loginUserMutation.mutate(loginDetails);
    },
    onError: (res) => {
      setError("root", {
        errors: res.response.data.errors,
      });
    },
  });

  return { registerUserMutation };
}
