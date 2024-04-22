import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginUser, registerUser } from "../../../api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../../../stores/store";
import { validateAvatar } from "../../../utils/validation";
import { useState } from "react";
import Spinner from "../../ui/spinner";

const schema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9_]+$/, {
    message:
      "Name must not contain punctuation symbols apart from underscore (_)",
  }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .refine((value) => value.endsWith("@stud.noroff.no"), {
      message: "Email must be a valid stud.noroff.no email address",
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
  const [formData, setFormData] = useState(null); // Declare formData state

  const { login, updateUser } = useBoundStore();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    setError,
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
      setError("root", {
        errors: res.response.data.errors,
      });
    },
  });

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      const loginDetails = {
        email: formData.email,
        password: formData.password,
      };

      loginUserMutation.mutate(loginDetails);
    },
    onError: (res) => {
      setError("root", {
        errors: res.response.data.errors,
      });
    },
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label htmlFor="name">Name:</label>
      <input
        className="border p-2"
        type="text"
        {...register("name")}
        placeholder="Name"
        name="name"
      />
      {errors?.name && (
        <div className="text-red-500">{errors.name.message}</div>
      )}

      <label htmlFor="email">Email:</label>
      <input
        className="border p-2"
        type="email"
        {...register("email")}
        placeholder="email"
        name="email"
        autoComplete="email"
      />
      {errors?.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      <label htmlFor="password">Password</label>
      <input
        className="border p-2"
        type="password"
        name="password"
        {...register("password")}
        placeholder="password"
      />
      {errors?.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}

      <label htmlFor="bio">Bio:</label>
      <textarea
        className="border p-2"
        {...register("bio")}
        placeholder="Bio"
        name="bio"
      />
      {errors?.bio && <div className="text-red-500">{errors.bio.message}</div>}

      <label htmlFor="avatar">Avatar URL:</label>
      <input
        className="border p-2"
        type="url"
        {...register("avatar.url")}
        placeholder="Avatar URL"
        name="avatar.url"
      />
      {errors?.avatar?.url && (
        <div className="text-red-500">{errors.avatar.url.message}</div>
      )}

      <label htmlFor="avatar.alt">Avatar Alt Text:</label>
      <input
        className="border p-2"
        type="text"
        {...register("avatar.alt")}
        placeholder="Avatar Alt Text"
        name="avatar.alt"
      />
      {errors?.avatar?.alt && (
        <div className="text-red-500">{errors.avatar.alt.message}</div>
      )}

      <label htmlFor="banner">banner URL:</label>
      <input
        className="border p-2"
        type="url"
        {...register("banner.url")}
        placeholder="banner URL"
        name="banner.url"
      />
      {errors?.banner?.url && (
        <div className="text-red-500">{errors.banner.url.message}</div>
      )}

      <label htmlFor="banner.alt">banner Alt Text:</label>
      <input
        className="border p-2"
        type="text"
        {...register("banner.alt")}
        placeholder="banner Alt Text"
        name="banner.alt"
      />
      {errors?.banner?.alt && (
        <div className="text-red-500">{errors.banner.alt.message}</div>
      )}
      {/* Similarly add input fields for banner and venueManager */}

      <div className="flex items-center mb-4">
        <input
          id="default-checkbox"
          {...register("venueManager")}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="default-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Default checkbox
        </label>
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="flex h-[48px] justify-center items-center md:max-w-[200px] bg-gray-500 text-gray-100 py-3 font-semibold rounded-lg hover:opacity-85 transition duration-300 ease-in-out"
      >
        {isSubmitting ||
        registerUserMutation.isPending ||
        loginUserMutation.isPending ? (
          <Spinner />
        ) : (
          "Register"
        )}
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
