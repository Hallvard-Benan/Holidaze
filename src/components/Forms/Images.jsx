import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TfiClose } from "react-icons/tfi";
import { CiCirclePlus } from "react-icons/ci";
import { Label } from "../ui/label";
import { validateAvatar } from "../../utils/validation";
import PropTypes from "prop-types";

function Images({ images = [], onImagesChange }) {
  const [image, setImage] = useState("");
  const [active, setActive] = useState(false);
  const [alt, setAlt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = function (e) {
    setImage(e.target.value);
  };

  const handleAltChange = function (e) {
    setAlt(e.target.value);
  };

  const addImage = async function (imageToAdd) {
    const validatedImage = await validateAvatar(imageToAdd.url);
    const imageExists = images.some((img) => img.url === imageToAdd.url);

    if (validatedImage && !imageExists && imageToAdd.url.length > 0) {
      onImagesChange([...images, imageToAdd]);
      setError(null);
      setActive(false); // Reset active state
    } else if (imageExists) {
      setError("Cannot submit same image multiple times");
    } else if (!validatedImage) {
      setError("Must be a valid URL to a publicly available image");
    }
    setImage("");
  };

  const removeImage = function (imageToRemove) {
    const upToDateImages = images.filter(
      (img) => img.url !== imageToRemove.url,
    );
    onImagesChange(upToDateImages);
  };

  return (
    <div className="grid gap-3">
      <h3>Images:</h3>
      <div className="border border-dotted bg-white p-4 text-center text-muted-foreground">
        {images?.length === 0 ? (
          <p>no images</p>
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
      <Button type="button" onClick={() => setActive(true)}>
        Add image
      </Button>

      {active && (
        <div>
          <div className="grid gap-4">
            <fieldset>
              <div className="flex">
                <div>
                  <Label htmlFor="image">Image URL:</Label>
                  <Input
                    onChange={handleImageChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addImage({ url: image, alt });
                      }
                    }}
                    placeholder={
                      isFocused ? "write the URL to the image" : "add image"
                    }
                    id="image"
                    value={image}
                  />
                </div>
                <div>
                  <Label htmlFor="alt">Image Alt:</Label>
                  <Input
                    onChange={handleAltChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addImage({ url: image, alt });
                      }
                    }}
                    placeholder={
                      isFocused ? "write the URL to the image" : "add image"
                    }
                    id="alt"
                    value={alt}
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => addImage({ url: image, alt })}
                  className="flex gap-1 bg-primary"
                >
                  <p>Add image</p>
                  <CiCirclePlus size={28} />
                </Button>
              </div>
            </fieldset>
          </div>
          {error && <div className="text-destructive">{error}</div>}
        </div>
      )}
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
