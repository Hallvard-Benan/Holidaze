import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TfiClose } from "react-icons/tfi";
import { CiCirclePlus } from "react-icons/ci";
import { Label } from "../ui/label";
import { validateAvatar } from "../../utils/validation";
import PropTypes from "prop-types";
import { cn } from "../../utils/utils";
import Spinner from "../ui/spinner";

function Images({ images = [], onImagesChange, max }) {
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleImageChange = function (e) {
    setImage(e.target.value);
  };

  const handleAltChange = function (e) {
    setAlt(e.target.value);
  };

  useEffect(() => {
    if (!isFocused && !image) setError("");
  }, [isFocused, image]);

  const addImage = async function (imageToAdd) {
    setIsValidating(true);
    const validatedImage = await validateAvatar(imageToAdd.url);
    const imageExists = images.some((img) => img.url === imageToAdd.url);

    if (validatedImage && !imageExists && imageToAdd.url.length > 0) {
      onImagesChange([...images, imageToAdd]);
      setError(null);
      setImage("");
      setAlt("");
    } else if (imageExists) {
      setError("Cannot submit same image multiple times");
    } else if (!validatedImage) {
      setError("Must be a valid URL to a publicly available image");
    }
    setIsValidating(false);
  };

  const removeImage = function (imageToRemove) {
    const upToDateImages = images.filter(
      (img) => img.url !== imageToRemove.url,
    );
    onImagesChange(upToDateImages);
  };

  return (
    <div className="grid gap-3">
      <div className="rounded-md border border-dotted bg-white p-4 text-center  text-muted-foreground">
        {images?.length === 0 ? (
          <p className="h-20">No images yet</p>
        ) : (
          <div>
            <div className="flex flex-wrap gap-8">
              {images.map((img, index) => (
                <div key={index} className="relative h-20">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="max-h-full rounded-md"
                  />
                  <Button
                    type="button"
                    onClick={() => removeImage(img)}
                    className="absolute right-0 top-0 flex aspect-square h-8 w-8 -translate-y-1/4 translate-x-1/2 items-center justify-center rounded-full bg-muted p-0 text-muted-foreground hover:bg-rose-100 hover:text-destructive"
                  >
                    <TfiClose />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="flex w-full  flex-col gap-4 ">
          {images.length >= max && `Limit of ${max} Images Reached`}
          <div className="grid w-full gap-2">
            <Label htmlFor="image">Image URL:</Label>
            <div className="group relative">
              <Input
                disabled={images.length >= max}
                onChange={handleImageChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addImage({ url: image, alt });
                  }
                }}
                placeholder={"https://..."}
                id="image"
                value={image}
              />
              <button
                type="button"
                onClick={() => setImage("")}
                className={cn(
                  "absolute right-0 top-1/2 hidden -translate-x-1 -translate-y-1/2 items-center justify-center rounded-md border border-destructive bg-secondary  px-2  text-destructive  text-opacity-0 transition-opacity duration-300",
                  image && " opacity-100 group-hover:flex",
                )}
              >
                clear
              </button>
            </div>
          </div>
          <div className=" grid w-full gap-2">
            <Label htmlFor="alt">Image Description:</Label>
            <div className="group relative">
              <Input
                disabled={images.length >= max}
                onChange={handleAltChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addImage({ url: image, alt });
                  }
                }}
                placeholder={"Balcony view..."}
                id="alt"
                value={alt}
              />
              <button
                type="button"
                onClick={() => setAlt("")}
                className={cn(
                  "absolute right-0 top-1/2 hidden -translate-x-1 -translate-y-1/2 items-center justify-center rounded-md border border-destructive  bg-transparent px-2  text-destructive  text-opacity-0 transition-opacity duration-300",
                  alt && " opacity-100 group-hover:flex",
                )}
              >
                clear
              </button>
            </div>
          </div>
          <Button
            type="button"
            disabled={!image}
            onClick={() => addImage({ url: image, alt })}
            className=" gap-1 bg-primary"
          >
            {!isValidating ? (
              <>
                {" "}
                <p>Add</p> <CiCirclePlus size={28} />{" "}
              </>
            ) : (
              <Spinner />
            )}
          </Button>
        </div>

        {error && <div className="text-destructive">{error}</div>}
      </div>
    </div>
  );
}
Images.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
  ),
  onImagesChange: PropTypes.func.isRequired,
};

export default Images;
