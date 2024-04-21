import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginUser } from "../../../api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../../../stores/store";

const schema = z.object({
  // Insert a check that the email ends with: @stud.noroff.no, with the message "must be a valid Noroff email ending in @stud.noroff.no"
  email: z
    .string()
    .email({ message: "invalid email format" })
    .refine((value) => value.endsWith("@stud.noroff.no"), {
      message: "Must be a valid email address, ending in @stud.noroff.no",
    }),
  password: z.string().min(8, { message: "must be 8 characters" }),
});

export default function LoginForm() {
  const { login, updateUser } = useBoundStore();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      updateUser(res.data.data);
      login();
      navigate("/");
    },
    onError: (res) => {
      console.log(res);
    },
  });

  const onSubmit = async (data) => {
    loginUserMutation.mutate(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4">
      <label htmlFor="email">Email:</label>
      <input
        className="border p-2"
        type="email"
        {...register("email")}
        placeholder="email"
        name="email"
        defaultValue={"thebestuser@stud.noroff.no"}
        autoComplete="email"
      />
      {errors?.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      <label htmlFor="password"></label>
      <input
        className="border p-2"
        type="password"
        defaultValue={"thebestuser123"}
        name="password"
        autoComplete="current-password"
        {...register("password")}
        placeholder="password"
      />
      {errors?.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}

      {errors.root && <div>{errors.root.message}</div>}
      <button
        disabled={isSubmitting}
        type="submit"
        className="flex h-[48px] justify-center items-center md:max-w-[200px] bg-gray-500 text-gray-100 py-3 font-semibold rounded-lg hover:opacity-85 transition duration-300 ease-in-out"
      >
        {isSubmitting ? "..." : "Login"}
      </button>
    </form>
  );
}
