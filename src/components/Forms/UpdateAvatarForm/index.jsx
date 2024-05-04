import { FaEdit } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogDescription,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { cn } from "../../../utils/utils";
import useUpdateUser from "../../../hooks/useUpdateUser";
import { useBoundStore } from "../../../stores/store";
import { InputGroup } from "../../ui/inputGroup";
import { useForm } from "react-hook-form";
import { validateAvatar } from "../../../utils/validation";
import Spinner from "../../ui/spinner";
import { useState } from "react";

export default function UpdateAvatarForm({ className, userName }) {
  const avatar = useBoundStore((state) => state.user.avatar);
  const [formState, setFormState] = useState({
    url: avatar.url,
    alt: avatar.alt,
  });
  const schema = z.object({
    avatar: z.object({
      url: z
        .string()
        .max(300)
        .optional()
        .refine((value) => !value || validateAvatar(value), {
          message: "Avatar URL must be a valid image-URL or left empty",
        }),
      alt: z.string().max(120).optional(),
    }),
  });
  const {
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { updateProfileMutation } = useUpdateUser({ setError, name: userName });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);
    updateProfileMutation.mutate({
      name: userName,
      body: { avatar: formState },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("", className)}>
          <FaEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-400 sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Edit avatar</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
            <div className="flex justify-between">
              <div>
                <p>Old Avatar</p>
                <img
                  src={avatar.url}
                  alt={avatar.alt}
                  className="h-20 w-20 rounded-full object-cover"
                />
              </div>
              <div>
                <p>New Avatar</p>
                <img
                  src={formState.url}
                  alt="new avatar"
                  className="h-20 w-20 rounded-full object-cover"
                />
              </div>
            </div>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid  items-center gap-4">
              <InputGroup
                id="avatar.url"
                onChange={(e) => {
                  setFormState((prev) => ({
                    ...prev,
                    url: e.currentTarget.value,
                  }));
                }}
                label="Avatar"
                value={formState.url}
              ></InputGroup>
            </div>
            <div className="grid  items-center gap-4">
              <InputGroup
                onChange={(e) => {
                  setFormState((prev) => ({
                    ...prev,
                    alt: e.currentTarget.value,
                  }));
                  console.log("Form State Alt:", formState.alt); // Log the updated Alt
                }}
                value={formState.alt}
                id="avatar-alt"
                label="Image description"
              ></InputGroup>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {updateProfileMutation.status === "pending" ? (
                <Spinner />
              ) : (
                "Save changes"
              )}
            </Button>
            {errors?.root && (
              <div className="text-red-500">
                {errors.root.errors.map((m, i) => (
                  <p key={i}>{m.message}</p>
                ))}
              </div>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
