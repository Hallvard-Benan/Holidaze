import { InputGroup, TextAreaGroup } from "../../ui/inputGroup";
import Images from "../Images";
import { FaWifi } from "react-icons/fa6";
import { CiParking1 } from "react-icons/ci";
import { PiForkKnife, PiPawPrint, PiBed } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { useBoundStore } from "../../../stores/store";
import NumberButtons from "../../ui/numberButtons";

export function DetailsStep({
  updateItem,
  defaultValues,
  errorMessages,
  maxGuests,
  increaseItem,
  decreaseItem,
}) {
  console.log(defaultValues);
  return (
    <FormStepContainer title={"Details"}>
      <InputGroup
        success={errorMessages?.name?.isValid}
        onChange={(e) => {
          updateItem({ name: e.currentTarget.value });
        }}
        required
        errorMessage={errorMessages?.name?.message}
        label="Name"
        id="name"
        value={defaultValues.name}
      />
      <TextAreaGroup
        success={errorMessages?.description?.isValid}
        errorMessage={errorMessages?.description?.message}
        required
        onChange={(e) => updateItem({ description: e.currentTarget.value })}
        id={"description"}
        label="Description"
        type="textarea"
        value={defaultValues.description}
      />
      <InputGroup
        errorMessage={errorMessages?.price?.message}
        success={errorMessages?.price?.isValid}
        required
        onChange={(e) => updateItem({ price: parseInt(e.currentTarget.value) })}
        id={"price"}
        label="Price"
        type="number"
        value={defaultValues.price}
      />
      <NumberButtons
        value={maxGuests}
        onIncrease={() => increaseItem("maxGuests")}
        onDecrease={() => decreaseItem("maxGuests")}
      />
    </FormStepContainer>
  );
}

export function AmenitiesStep({
  defaultValues,
  updateMeta,
  increaseItem,
  decreaseItem,
  rating,
}) {
  return (
    <FormStepContainer title={"Amenities"}>
      <div>
        <IconContainer>
          <FaRegStar />
        </IconContainer>
        <NumberButtons
          value={rating}
          onIncrease={() => increaseItem("rating")}
          onDecrease={() => decreaseItem("rating")}
        />
      </div>

      <div>
        <div className="grid grid-cols-2 gap-6">
          <AmenityContainer>
            <IconContainer>
              <FaWifi />
            </IconContainer>
            <InputGroup
              id={"wifi"}
              label="Wifi"
              onChange={(e) => updateMeta({ wifi: e.currentTarget.checked })}
              type="checkbox"
              checked={defaultValues.meta.wifi}
            />
          </AmenityContainer>
          <AmenityContainer>
            <IconContainer>
              <CiParking1 />
            </IconContainer>
            <InputGroup
              id={"parking"}
              label="Parking"
              checked={defaultValues.meta.parking}
              onChange={(e) => updateMeta({ parking: e.currentTarget.checked })}
              type="checkbox"
            />
          </AmenityContainer>
          <AmenityContainer>
            <IconContainer>
              <PiBed />
            </IconContainer>
            <InputGroup
              checked={defaultValues.meta.breakfast}
              id={"breakfast"}
              label="Breakfast"
              onChange={(e) =>
                updateMeta({ breakfast: e.currentTarget.checked })
              }
              type="checkbox"
            />
          </AmenityContainer>
          <AmenityContainer>
            <IconContainer>
              <PiPawPrint />
            </IconContainer>
            <InputGroup
              id={"pets"}
              type="checkbox"
              label="Pets"
              checked={defaultValues.meta.pets}
              onChange={(e) => updateMeta({ pets: e.currentTarget.checked })}
            />
          </AmenityContainer>
        </div>
      </div>
    </FormStepContainer>
  );
}

export function LocationStep({ updateLocation, defaultValues }) {
  return (
    <FormStepContainer title={"Location"}>
      <div className="grid grid-cols-2 gap-2">
        <InputGroup
          className="w-22"
          value={defaultValues.location.address}
          id={"address"}
          label="Address"
          onChange={(e) => updateLocation({ address: e.currentTarget.value })}
        />
        <InputGroup
          value={defaultValues.location.city}
          id={"city"}
          label="City"
          onChange={(e) => updateLocation({ city: e.currentTarget.value })}
        />
        <InputGroup
          id={"zip"}
          label="Zip Code"
          value={defaultValues.location.zip}
          onChange={(e) => updateLocation({ zip: e.currentTarget.value })}
        />
        <InputGroup
          value={defaultValues.location.country}
          id={"country"}
          label="Country"
          onChange={(e) => updateLocation({ country: e.currentTarget.value })}
        />
        <InputGroup
          id={"continent"}
          label="Continent"
          value={defaultValues.location.continent}
          onChange={(e) => updateLocation({ continent: e.currentTarget.value })}
        />
      </div>
      <InputGroup
        id={"latitude"}
        label="Latitude"
        value={defaultValues.location.lat}
        onChange={(e) =>
          updateLocation({ lat: parseInt(e.currentTarget.value) })
        }
        type="number"
      />

      <InputGroup
        id={"longitude"}
        label="Longitude"
        value={defaultValues.location.lng}
        onChange={(e) =>
          updateLocation({ lng: parseInt(e.currentTarget.value) })
        }
        type="number"
      />
    </FormStepContainer>
  );
}

export function ImagesStep({ images, handleImagesChange }) {
  return (
    <FormStepContainer title={"Images"}>
      <Images images={images} onImagesChange={handleImagesChange} />
    </FormStepContainer>
  );
}

export function ReviewStep({}) {
  return <div>review your thingamajig</div>;
}

function FormStepContainer({ title, children }) {
  return (
    <div className="grid gap-6 px-2 sm:gap-8">
      <h1 className="text-center text-xl font-semibold">{title}</h1>
      {children}
    </div>
  );
}

export function AmenityContainer({ children }) {
  return (
    <div className=" just grid  grid-cols-2 items-center justify-center gap-4  p-4">
      {children}
    </div>
  );
}

export function IconContainer({ children }) {
  return <div className="w-fit border text-4xl">{children}</div>;
}
