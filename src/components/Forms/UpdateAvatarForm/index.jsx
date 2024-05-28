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
import { InputGroup } from "../../ui/inputGroup";
import { useForm } from "react-hook-form";
import { validateAvatar } from "../../../utils/validation";
import Spinner from "../../ui/spinner";
import { useEffect, useState } from "react";

export default function UpdateAvatarForm({
  variant,
  image,
  className,
  userName,
}) {
  const [newAvatarValid, setNewAvatarValid] = useState(false);
  const [formState, setFormState] = useState({
    url: image.url,
    alt: image.alt,
  });
  const schema = z.object({
    avatar: z.object({
      url: z
        .string()
        .max(300)
        .optional()
        .refine((value) => !value || validateAvatar(value), {
          message: "Image URL must be a valid image-URL or left empty",
        }),
      alt: z.string().max(120).optional(),
    }),
  });
  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { updateProfileMutation } = useUpdateUser({
    setError,
    name: userName,
    onSuccess: clearErrors,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    updateProfileMutation.mutate({
      name: userName,
      body: { [variant]: formState },
    });
  };

  useEffect(() => {
    (async () => {
      const isValid = await validateAvatar(formState.url);
      setNewAvatarValid(isValid);
    })();
  }, [formState]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("", className)}>
          <FaEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className=" w-[425px] max-w-[90vw]">
        <form
          onSubmit={onSubmit}
          className="max-w-full overflow-hidden break-words"
        >
          <DialogHeader>
            <DialogTitle>Edit {variant}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
            <div className="flex justify-between">
              <div>
                <p>Old {variant}</p>
                <img
                  src={image.url}
                  alt={image.alt}
                  className={cn(
                    "h-20 w-20 rounded-full object-cover",
                    variant === "banner" && "aspect-video w-auto rounded-md",
                  )}
                />
              </div>
              <div>
                <p>New {variant}</p>
                <img
                  src={
                    newAvatarValid
                      ? formState.url
                      : "https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                  }
                  alt="new avatar"
                  className={cn(
                    "h-20 w-20 rounded-full object-cover",
                    variant === "banner" && "aspect-video w-auto rounded-md",
                  )}
                />
              </div>
            </div>
          </DialogHeader>
          <div className="grid w-full gap-4 py-4">
            <div className="grid items-center gap-4">
              <InputGroup
                errorWidth="300px"
                errorMessage={errors?.root?.errors[0]?.message}
                id="avatar.url"
                onChange={(e) => {
                  setFormState((prev) => ({
                    ...prev,
                    url: e.currentTarget.value,
                  }));
                }}
                label="Image URL"
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
                }}
                value={formState.alt}
                id="avatar-alt"
                label="Image description"
              ></InputGroup>
            </div>
          </div>
          <DialogFooter className={"grid"}>
            <Button type="submit">
              {updateProfileMutation.status === "pending" ? (
                <Spinner />
              ) : (
                "Save changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
