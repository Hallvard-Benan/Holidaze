import { useState } from "react";
import Images from "../Images";

import { useForm } from "react-hook-form";
import { useBoundStore } from "../../../stores/store";
import { InputGroup, TextAreaGroup } from "../../ui/inputGroup";
import { Button } from "../../ui/button";
import useCreateVenue from "../../../hooks/useCreateVenue";
import Spinner from "../../ui/spinner";

export default function CreateVenueForm() {
  const { updateItem, venueFormData, updateMeta, updateLocation } =
    useBoundStore();

  const {
    setError,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState([]);
  const { createVenueMutation } = useCreateVenue({ setError });

  const handleImagesChange = (newImages) => {
    setImages(newImages);
    updateItem({ media: newImages });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    function validate(data) {}

    validate(venueFormData);
    createVenueMutation.mutate(venueFormData);
  };

  return (
    <form className="mx-auto grid w-calc gap-4" onSubmit={onSubmit}>
      <InputGroup
        onChange={(e) => updateItem({ name: e.currentTarget.value })}
        required
        label={"name"}
        errorMessage={errors.name?.message}
      />

      <TextAreaGroup
        required
        onChange={(e) => updateItem({ description: e.currentTarget.value })}
        label={"description"}
        type="textarea"
        errorMessage={errors.description?.message}
      />

      <InputGroup
        required
        onChange={(e) => updateItem({ price: parseInt(e.currentTarget.value) })}
        label={"price"}
        type="number"
        errorMessage={errors.price?.message}
      />

      <InputGroup
        required
        onChange={(e) =>
          updateItem({ maxGuests: parseInt(e.currentTarget.value) })
        }
        label={"Maximum number of guests"}
        id={"maxGuests"}
        type="number"
        max={100}
        errorMessage={errors.maxGuests?.message}
      />

      <InputGroup
        label={"rating"}
        onChange={(e) =>
          updateItem({ rating: parseInt(e.currentTarget.value) })
        }
        type="number"
        max={5}
        errorMessage={errors.rating?.message}
      />

      <div>
        <h3>Amenities</h3>
        <div className="flex justify-evenly">
          <InputGroup
            label={"wifi"}
            onChange={(e) => updateMeta({ wifi: e.currentTarget.checked })}
            type="checkbox"
            errorMessage={errors.meta?.wifi?.message}
          />
          <InputGroup
            label={"parking"}
            onChange={(e) => updateMeta({ parking: e.currentTarget.checked })}
            type="checkbox"
            errorMessage={errors.meta?.parking?.message}
          />
          <InputGroup
            label={"breakfast"}
            onChange={(e) => updateMeta({ breakfast: e.currentTarget.checked })}
            type="checkbox"
            errorMessage={errors.meta?.breakfast?.message}
          />
          <InputGroup
            label={"pets"}
            type="checkbox"
            onChange={(e) => updateMeta({ pets: e.currentTarget.checked })}
            errorMessage={errors.meta?.pets?.message}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <InputGroup
          label={"address"}
          onChange={(e) => updateLocation({ address: e.currentTarget.value })}
          errorMessage={errors.location?.address?.message}
        />
        <InputGroup
          label={"city"}
          onChange={(e) => updateLocation({ city: e.currentTarget.value })}
          errorMessage={errors.location?.city?.message}
        />
        <InputGroup
          label={"zip"}
          onChange={(e) => updateLocation({ zip: e.currentTarget.value })}
          errorMessage={errors.location?.zip?.message}
        />
        <InputGroup
          label={"country"}
          onChange={(e) => updateLocation({ country: e.currentTarget.value })}
          errorMessage={errors.location?.country?.message}
        />
        <InputGroup
          label={"continent"}
          onChange={(e) => updateLocation({ continent: e.currentTarget.value })}
          errorMessage={errors.location?.continent?.message}
        />
      </div>

      <InputGroup
        label={"latitude"}
        onChange={(e) =>
          updateLocation({ lat: parseInt(e.currentTarget.value) })
        }
        type="number"
        errorMessage={errors.location?.lat?.message}
      />

      <InputGroup
        label={"longitude"}
        onChange={(e) =>
          updateLocation({ long: parseInt(e.currentTarget.value) })
        }
        type="number"
        errorMessage={errors.location?.lng?.message}
      />

      <Images images={images} onImagesChange={handleImagesChange} />

      {errors?.root && (
        <div className="text-red-500">
          {errors.root.errors.map((m, i) => (
            <p key={i}>{m.message}</p>
          ))}
        </div>
      )}

      <Button type="submit">
        {createVenueMutation.status === "pending" ? (
          <Spinner></Spinner>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
