import { InputGroup, TextAreaGroup } from "../../ui/inputGroup";
import Images from "../Images";
import { FaWifi } from "react-icons/fa6";
import { CiParking1 } from "react-icons/ci";
import { PiForkKnife, PiPawPrint, PiBed } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";

export function DetailsStep({ updateItem, defaultValues }) {
  return (
    <FormStepContainer title={"Details"}>
      {" "}
      <InputGroup
        onChange={(e) => updateItem({ name: e.currentTarget.value })}
        required
        label="Name"
        id={"name"}
        {...(defaultValues ? { defaultValue: defaultValues?.name } : {})}
      />
      <TextAreaGroup
        required
        onChange={(e) => updateItem({ description: e.currentTarget.value })}
        id={"description"}
        label="Description"
        type="textarea"
        {...(defaultValues ? { defaultValue: defaultValues?.description } : {})}
      />
      <InputGroup
        required
        onChange={(e) => updateItem({ price: parseInt(e.currentTarget.value) })}
        id={"price"}
        label="Price"
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
    </FormStepContainer>
  );
}

export function AmenitiesStep({ updateItem, defaultValues, updateMeta }) {
  return (
    <FormStepContainer title={"Amenities"}>
      <div>
        <IconContainer>
          <FaRegStar />
        </IconContainer>
        <InputGroup
          id={"rating"}
          label="Rating"
          {...(defaultValues ? { defaultValue: defaultValues.rating } : {})}
          onChange={(e) =>
            updateItem({ rating: parseInt(e.currentTarget.value) })
          }
          type="number"
          max={5}
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
              {...(defaultValues
                ? { defaultChecked: defaultValues.meta.wifi }
                : {})}
            />
          </AmenityContainer>
          <AmenityContainer>
            <IconContainer>
              <CiParking1 />
            </IconContainer>
            <InputGroup
              id={"parking"}
              label="Parking"
              {...(defaultValues
                ? { defaultChecked: defaultValues.meta.parking }
                : {})}
              onChange={(e) => updateMeta({ parking: e.currentTarget.checked })}
              type="checkbox"
            />
          </AmenityContainer>
          <AmenityContainer>
            <IconContainer>
              <PiBed />
            </IconContainer>
            <InputGroup
              {...(defaultValues
                ? { defaultChecked: defaultValues.meta.breakfast }
                : {})}
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
              {...(defaultValues
                ? { defaultChecked: defaultValues.meta.pets }
                : {})}
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
          {...(defaultValues
            ? { defaultValue: defaultValues.location.address }
            : {})}
          id={"address"}
          label="Address"
          onChange={(e) => updateLocation({ address: e.currentTarget.value })}
        />
        <InputGroup
          {...(defaultValues
            ? { defaultValue: defaultValues.location.city }
            : {})}
          id={"city"}
          label="City"
          onChange={(e) => updateLocation({ city: e.currentTarget.value })}
        />
        <InputGroup
          id={"zip"}
          label="Zip Code"
          {...(defaultValues
            ? { defaultValue: defaultValues.location.zip }
            : {})}
          onChange={(e) => updateLocation({ zip: e.currentTarget.value })}
        />
        <InputGroup
          {...(defaultValues
            ? { defaultValue: defaultValues.location.country }
            : {})}
          id={"country"}
          label="Country"
          onChange={(e) => updateLocation({ country: e.currentTarget.value })}
        />
        <InputGroup
          id={"continent"}
          label="Continent"
          {...(defaultValues
            ? { defaultValue: defaultValues.location.continent }
            : {})}
          onChange={(e) => updateLocation({ continent: e.currentTarget.value })}
        />
      </div>
      <InputGroup
        id={"latitude"}
        label="Longitude"
        {...(defaultValues ? { defaultValue: defaultValues.location.lat } : {})}
        onChange={(e) =>
          updateLocation({ lat: parseInt(e.currentTarget.value) })
        }
        type="number"
      />

      <InputGroup
        id={"longitude"}
        label="Latitude"
        {...(defaultValues ? { defaultValue: defaultValues.location.lng } : {})}
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
