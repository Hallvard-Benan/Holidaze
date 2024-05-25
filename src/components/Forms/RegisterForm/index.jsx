import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { validateAvatar } from "../../../utils/validation";
import { useState } from "react";
import Spinner from "../../ui/spinner";
import { FormSection, FormContainer } from "../ui";
import useLoginMutation from "../../../hooks/useLoginUserMutation";
import useRegisterMutation from "../../../hooks/useRegisterUserMutation";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "../../ui/button";

const schema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9_]+$/, {
    message:
      "Name must not contain punctuation symbols apart from underscore (_)",
  }),
  email: z.string().refine((value) => value.endsWith("@stud.noroff.no"), {
    message: "Valid stud.noroff.no email address is required",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  bio: z.string().max(160).optional(),
  avatar: z
    .object({
      url: z
        .string()
        .optional()
        .refine((value) => !value || validateAvatar(value), {
          message: "Avatar URL must be a valid image-URL or left empty",
        }),
      alt: z.string().max(120).optional(),
    })
    .optional(),
  banner: z
    .object({
      url: z
        .string()
        .optional()
        .refine((value) => !value || validateAvatar(value), {
          message: "Banner URL must be a valid image URL or left empty",
        }),
      alt: z.string().max(120).optional(),
    })
    .optional(),
  venueManager: z.boolean().optional(),
});

export default function RegisterForm() {
  const [formData, setFormData] = useState(null);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const { loginUserMutation } = useLoginMutation({
    setError,
  });

  const { registerUserMutation } = useRegisterMutation({
    formData,
    loginUserMutation,
    setError,
  });

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      avatar: data.avatar.url
        ? { url: data.avatar.url, alt: data.avatar.alt }
        : undefined,
      banner: data.banner.url
        ? { url: data.banner.url, alt: data.banner.alt }
        : undefined,
    };

    setFormData(formData); // Set formData state
    registerUserMutation.mutate(formData);
    reset();
  };

  return (
    <FormContainer
      title={"Sign up"}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <FormSection>
        <Label htmlFor="name">Name:</Label>
        <Input
          className="border p-2"
          type="text"
          {...register("name")}
          placeholder="User name"
          name="name"
        />
        {errors?.name && (
          <div className="text-destructive">{errors.name.message}</div>
        )}
      </FormSection>

      <FormSection>
        <Label htmlFor="email">Email:</Label>
        <Input
          className="border p-2"
          type="email"
          {...register("email")}
          placeholder="email@stud.noroff.no"
          name="email"
          autoComplete="email"
        />
        {errors?.email && (
          <div className="text-destructive">{errors.email.message}</div>
        )}
      </FormSection>
      <FormSection>
        <Label htmlFor="password">Password</Label>
        <Input
          className="border p-2"
          type="password"
          name="password"
          {...register("password")}
          placeholder="********"
        />
        {errors?.password && (
          <div className="text-destructive">{errors.password.message}</div>
        )}
      </FormSection>

      <FormSection>
        <Label htmlFor="bio">Bio:</Label>
        <textarea
          className="border p-2"
          {...register("bio")}
          placeholder="About me ..."
          name="bio"
        />
        {errors?.bio && (
          <div className="text-destructive">{errors.bio.message}</div>
        )}
      </FormSection>
      <FormSection>
        <Label htmlFor="avatar">Avatar Image URL:</Label>
        <Input
          className="border p-2"
          type="url"
          {...register("avatar.url")}
          placeholder={"https://..."}
          name="avatar.url"
        />
        {errors?.avatar?.url && (
          <div className="text-destructive">{errors.avatar.url.message}</div>
        )}
      </FormSection>
      <FormSection>
        <Label htmlFor="avatar.alt">Avatar Description:</Label>
        <Input
          className="border p-2"
          type="text"
          {...register("avatar.alt")}
          placeholder="Me at the zoo..."
          name="avatar.alt"
        />
        {errors?.avatar?.alt && (
          <div className="text-destructive">{errors.avatar.alt.message}</div>
        )}
      </FormSection>
      <FormSection>
        <Label htmlFor="banner">Banner image URL:</Label>
        <Input
          className="border p-2"
          type="url"
          {...register("banner.url")}
          placeholder={"https://..."}
          name="banner.url"
        />
        {errors?.banner?.url && (
          <div className="text-destructive">{errors.banner.url.message}</div>
        )}
      </FormSection>

      <FormSection>
        <Label htmlFor="banner.alt">Banner description:</Label>
        <Input
          className="border p-2"
          type="text"
          {...register("banner.alt")}
          placeholder="My favorite painting of... "
          name="banner.alt"
        />
        {errors?.banner?.alt && (
          <div className="text-destructive">{errors.banner.alt.message}</div>
        )}
      </FormSection>

      <div className=" flex items-center gap-4">
        <Label htmlFor="venue-manager-check" className="">
          Become venue manager:
        </Label>
        <Input
          id="venue-manager-check"
          {...register("venueManager")}
          type="checkbox"
          className="size-6 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
        />
      </div>

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ||
        registerUserMutation.isPending ||
        loginUserMutation.isPending ? (
          <Spinner />
        ) : (
          "Register"
        )}
      </Button>
      {errors?.root && (
        <div className="text-destructive">
          {errors.root.errors.map((m, i) => (
            <p key={i}>{m.message}</p>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4">
        <p>Already a Member? </p>
        <Link
          className={buttonVariants({ variant: "outline" })}
          to={"/auth/login"}
        >
          Log in
        </Link>
      </div>
    </FormContainer>
  );
}
