import { useEffect, useState } from "react";
import Images from "../Images";
import { useBoundStore } from "../../../stores/store";
import { InputGroup, TextAreaGroup } from "../../ui/inputGroup";
import { Button } from "../../ui/button";
import Spinner from "../../ui/spinner";

export default function CreateVenueForm({
  onSubmit,
  defaultValues,
  errors,
  status,
}) {
  const { updateItem, updateMeta, updateLocation, updateVenueForm } =
    useBoundStore();
  const [images, setImages] = useState(
    defaultValues ? defaultValues.media : [],
  );

  useEffect(() => {
    if (defaultValues) {
      updateVenueForm(defaultValues);
    }
  }, [defaultValues]);

  const handleImagesChange = (newImages) => {
    setImages(newImages);
    updateItem({ media: newImages });
  };

  return (
    <form className="mx-auto grid w-calc gap-4" onSubmit={onSubmit}>
      <InputGroup
        onChange={(e) => updateItem({ name: e.currentTarget.value })}
        required
        label={"name"}
        {...(defaultValues ? { defaultValue: defaultValues?.name } : {})}
      />

      <TextAreaGroup
        required
        onChange={(e) => updateItem({ description: e.currentTarget.value })}
        label={"description"}
        type="textarea"
        {...(defaultValues ? { defaultValue: defaultValues?.description } : {})}
      />

      <InputGroup
        required
        onChange={(e) => updateItem({ price: parseInt(e.currentTarget.value) })}
        label={"price"}
        {...(defaultValues ? { defaultValue: defaultValues?.price } : {})}
        type="number"
      />

      <InputGroup
        required
        onChange={(e) =>
          updateItem({ maxGuests: parseInt(e.currentTarget.value) })
        }
        label={"Maximum number of guests"}
        id={"maxGuests"}
        {...(defaultValues ? { defaultValue: defaultValues.maxGuests } : {})}
        type="number"
        max={100}
      />

      <InputGroup
        label={"rating"}
        {...(defaultValues ? { defaultValue: defaultValues.rating } : {})}
        onChange={(e) =>
          updateItem({ rating: parseInt(e.currentTarget.value) })
        }
        type="number"
        max={5}
      />

      <div>
        <h3>Amenities</h3>
        <div className="flex justify-evenly">
          <InputGroup
            label={"wifi"}
            onChange={(e) => updateMeta({ wifi: e.currentTarget.checked })}
            type="checkbox"
            {...(defaultValues
              ? { defaultChecked: defaultValues.meta.wifi }
              : {})}
          />
          <InputGroup
            label={"parking"}
            {...(defaultValues
              ? { defaultChecked: defaultValues.meta.parking }
              : {})}
            onChange={(e) => updateMeta({ parking: e.currentTarget.checked })}
            type="checkbox"
          />
          <InputGroup
            {...(defaultValues
              ? { defaultChecked: defaultValues.meta.breakfast }
              : {})}
            label={"breakfast"}
            onChange={(e) => updateMeta({ breakfast: e.currentTarget.checked })}
            type="checkbox"
          />
          <InputGroup
            label={"pets"}
            type="checkbox"
            {...(defaultValues
              ? { defaultChecked: defaultValues.meta.pets }
              : {})}
            onChange={(e) => updateMeta({ pets: e.currentTarget.checked })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <InputGroup
          {...(defaultValues
            ? { defaultValue: defaultValues.location.address }
            : {})}
          label={"address"}
          onChange={(e) => updateLocation({ address: e.currentTarget.value })}
        />
        <InputGroup
          {...(defaultValues
            ? { defaultValue: defaultValues.location.city }
            : {})}
          label={"city"}
          onChange={(e) => updateLocation({ city: e.currentTarget.value })}
        />
        <InputGroup
          label={"zip"}
          {...(defaultValues
            ? { defaultValue: defaultValues.location.zip }
            : {})}
          onChange={(e) => updateLocation({ zip: e.currentTarget.value })}
        />
        <InputGroup
          {...(defaultValues
            ? { defaultValue: defaultValues.location.country }
            : {})}
          label={"country"}
          onChange={(e) => updateLocation({ country: e.currentTarget.value })}
        />
        <InputGroup
          label={"continent"}
          {...(defaultValues
            ? { defaultValue: defaultValues.location.continent }
            : {})}
          onChange={(e) => updateLocation({ continent: e.currentTarget.value })}
        />
      </div>

      <InputGroup
        label={"latitude"}
        {...(defaultValues ? { defaultValue: defaultValues.location.lat } : {})}
        onChange={(e) =>
          updateLocation({ lat: parseInt(e.currentTarget.value) })
        }
        type="number"
      />

      <InputGroup
        label={"longitude"}
        {...(defaultValues ? { defaultValue: defaultValues.location.lng } : {})}
        onChange={(e) =>
          updateLocation({ lng: parseInt(e.currentTarget.value) })
        }
        type="number"
      />

      <Images images={images} onImagesChange={handleImagesChange} />

      {errors && (
        <div className="text-red-500">
          {errors.map(({ message }, i) => (
            <p key={i}>{message}</p>
          ))}
        </div>
      )}

      <Button type="submit">
        {status === "pending" ? <Spinner></Spinner> : "Submit"}
      </Button>
    </form>
  );
}
