import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Spinner from "../../ui/spinner";
import useLoginMutation from "../../../hooks/useLoginUserMutation";

const schema = z.object({
  email: z.string().refine((value) => value.endsWith("@stud.noroff.no"), {
    message: "Must be a valid email address, ending in @stud.noroff.no",
  }),
  password: z.string().min(8, { message: "must be 8 characters" }),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  // needs vars from above hooks

  const { loginUserMutation } = useLoginMutation({
    setError,
  });

  const onSubmit = async (data) => {
    loginUserMutation.mutate(data);
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
        defaultValue={"cool_cat@stud.noroff.no"}
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

      <button
        disabled={isSubmitting}
        type="submit"
        className="flex h-[48px] items-center justify-center rounded-lg bg-gray-500 py-3 font-semibold text-gray-100 transition duration-300 ease-in-out hover:opacity-85 md:max-w-[200px]"
      >
        {isSubmitting || loginUserMutation.isPending ? <Spinner /> : "Login"}
      </button>
      {errors?.root && (
        <div className="text-red-500">
          {errors.root.errors.map((m, i) => (
            <p key={i}>{m.message}</p>
          ))}
        </div>
      )}
    </form>
  );
}
