import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { getUser } from "../api/profiles";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../stores/store";
import { useState } from "react";
import { toast } from "sonner";
export default function useLoginMutation({ setError }) {
  const [accessToken, setAccessToken] = useState("");
  const { login, updateUser } = useBoundStore();
  const navigate = useNavigate();

  const updateUserMutation = useMutation({
    mutationFn: getUser,
    onSuccess: (res) => {
      updateUser(res.data.data);
      login(accessToken);
      navigate(-1);
    },
    onError: (res) => {
      setError("root", {
        errors: res.response.data.errors,
      });
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      toast.success(`Logged in as ${res.data.data.name}`);
      setAccessToken(res.data.data.accessToken);
      updateUserMutation.mutate({
        name: res.data.data.name,
        token: res.data.data.accessToken,
      });
    },
    onError: (res) => {
      setError("root", {
        errors: res.response.data.errors,
      });
    },
  });

  return { loginUserMutation };
}
