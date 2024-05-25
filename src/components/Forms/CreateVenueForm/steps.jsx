import { InputGroup, TextAreaGroup } from "../../ui/inputGroup";
import Images from "../Images";
import { FaWifi } from "react-icons/fa6";
import { CiParking1 } from "react-icons/ci";
import { PiForkKnife, PiPawPrint, PiBed } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import NumberButtons from "../../ui/numberButtons";
import { Label } from "../../ui/label";
import { cn } from "../../../utils/utils";

export function DetailsStep({
  updateItem,
  defaultValues,
  errorMessages,
  maxGuests,
  increaseItem,
  decreaseItem,
  rating,
}) {
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
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2">
          <PiBed /> Max guests
        </Label>
        <NumberButtons
          errorMessage={errorMessages?.maxGuests?.message}
          value={maxGuests}
          onIncrease={() => increaseItem("maxGuests")}
          onDecrease={() => decreaseItem("maxGuests")}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2">
          <FaRegStar /> Rating
        </Label>
        <NumberButtons
          value={rating + " / 5"}
          onIncrease={() => increaseItem("rating")}
          onDecrease={() => decreaseItem("rating")}
        />
      </div>
    </FormStepContainer>
  );
}

export function AmenitiesStep({ defaultValues, updateMeta }) {
  const { wifi, parking, breakfast, pets } = defaultValues.meta;

  return (
    <FormStepContainer title={"Amenities"}>
      <div>
        <div className="grid gap-6 sm:grid-cols-2">
          <AmenityContainer
            isActive={wifi}
            onToggle={() => updateMeta({ wifi: !wifi })}
          >
            <IconContainer>
              <FaWifi />
            </IconContainer>
            <h3>Wifi</h3>
          </AmenityContainer>
          <AmenityContainer
            isActive={parking}
            onToggle={() => updateMeta({ parking: !parking })}
          >
            <IconContainer>
              <CiParking1 />
            </IconContainer>
            <h3>Parking</h3>
          </AmenityContainer>
          <AmenityContainer
            isActive={breakfast}
            onToggle={() => updateMeta({ breakfast: !breakfast })}
          >
            <IconContainer>
              <PiForkKnife />
            </IconContainer>
            <h3>Breakfast</h3>
          </AmenityContainer>
          <AmenityContainer
            isActive={pets}
            onToggle={() => updateMeta({ pets: !pets })}
          >
            <IconContainer>
              <PiPawPrint />
            </IconContainer>
            <h3>Pets</h3>
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

export function ReviewStep({ values }) {
  const { location, meta, name, description, maxGuests, price, media, rating } =
    values;

  const trueMetaKeys = Object.entries(meta)
    .filter(([key, value]) => value)
    .map(([key]) => key);

  return (
    <FormStepContainer
      title={"Summary"}
      className="grid gap-0 divide-y sm:gap-0"
    >
      <ReviewSection title={"Name"}>{name}</ReviewSection>
      <ReviewSection title={"Description"}>{description}</ReviewSection>
      <ReviewSection title={"Max Guests"}>{maxGuests}</ReviewSection>
      <ReviewSection title={"Price"}>
        {price.toLocaleString() + " kr /night"}
      </ReviewSection>
      <ReviewSection title={"Rating"}>
        <div className="flex  items-center gap-2">
          <FaRegStar /> {rating} / 5
        </div>
      </ReviewSection>
      <ReviewSection title={"Amenities"}>
        <div className="grid grid-cols-4">
          {trueMetaKeys.map((item) => (
            <AmenityContainer
              key={item}
              isActive={true}
              className={
                "text grid-cols-0 pointer-events-none cursor-default hover:opacity-100"
              }
            >
              <h3>{item}</h3>
            </AmenityContainer>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection title={"Images"}>
        <div className="flex flex-wrap gap-4">
          {media.length > 0 ? (
            media.map((img, index) => (
              <div key={index} className="relative h-20">
                <img
                  src={img.url}
                  alt={img.alt}
                  className="max-h-full rounded-md"
                />
              </div>
            ))
          ) : (
            <div className="text-muted-foreground">No images</div>
          )}
        </div>
      </ReviewSection>

      <ReviewSection title={"Location"}>
        <div>
          {location.address}, {location.zip}, {location.city},{" "}
          {location.country}, {location.continent}
        </div>
        <div className="flex gap-2">
          <p>Latitude: {location.lng}</p>
          <p>Longitude: {location.lat}</p>
        </div>
      </ReviewSection>
    </FormStepContainer>
  );
}

function FormStepContainer({ title, className, children }) {
  return (
    <div className={cn("grid gap-6 px-2 sm:gap-8", className)}>
      <h1 className="text-center text-xl font-semibold">{title}</h1>
      {children}
    </div>
  );
}

export function AmenityContainer({ onToggle, children, isActive, className }) {
  return (
    <div
      onClick={onToggle}
      className={cn(
        " grid grid-cols-2 items-center justify-center gap-4 rounded-lg border border-muted p-4 text-muted-foreground  transition-all duration-300 hover:cursor-pointer hover:bg-primary hover:text-white hover:opacity-60",
        isActive && "bg-primary text-primary-foreground hover:opacity-80",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function IconContainer({ children }) {
  return <div className="w-fit text-4xl">{children}</div>;
}

function ReviewSection({ title, children }) {
  return (
    <div className="grid gap-2 py-4">
      <h4 className="text-lg">{title}:</h4>
      {children}
    </div>
  );
}
