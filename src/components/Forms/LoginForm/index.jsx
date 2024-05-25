import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Spinner from "../../ui/spinner";
import useLoginMutation from "../../../hooks/useLoginUserMutation";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { FormSection, FormContainer } from "../ui";
import { buttonVariants } from "../../ui/button";

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

  const { loginUserMutation } = useLoginMutation({
    setError,
  });

  const onSubmit = async (data) => {
    loginUserMutation.mutate(data);
  };
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} title={"Log in"}>
      <FormSection>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          {...register("email")}
          placeholder="email@stud.noroff.no"
          name="email"
          autoComplete="email"
        />
        {errors?.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </FormSection>
      <FormSection>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          autoComplete="current-password"
          {...register("password")}
          placeholder="********"
        />
        {errors?.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
      </FormSection>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting || loginUserMutation.isPending ? <Spinner /> : "Login"}
      </Button>
      {errors?.root && (
        <div className="text-red-500">
          {errors.root.errors.map((m, i) => (
            <p key={i}>{m.message}</p>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4">
        <p>Not a member yet? </p>
        <Link
          className={buttonVariants({ variant: "outline" })}
          to={"/auth/register"}
        >
          Sign up
        </Link>
      </div>
    </FormContainer>
  );
}
