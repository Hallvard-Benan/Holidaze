import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import Spinner from "../../ui/spinner";
import { useMultistepForm } from "../../../hooks/useMultiStepForm";
import {
  AmenitiesStep,
  DetailsStep,
  ImagesStep,
  LocationStep,
  ReviewStep,
} from "./steps";
import ProgressBar from "../../ui/progressBar";
import { cn } from "../../../utils/utils";
import { FaChevronLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function CreateVenueForm({
  onSubmit,
  handleBack,
  defaultValues,
  errors,
  status,
  setError,
  updateItem,
  updateMeta,
  updateLocation,
  updateVenueForm,
  venueFormData,
  decreaseItem,
  increaseItem,
}) {
  const [errorMessages, setErrorMessages] = useState({
    name: { isValid: false },
    description: { isValid: false },
    price: { isValid: false },
    maxGuests: { isValid: false },
  });

  const [isExiting, setIsExiting] = useState(false);

  const isStepOneValid =
    errorMessages.name.isValid &&
    errorMessages.description.isValid &&
    errorMessages.price.isValid &&
    errorMessages.maxGuests.isValid;

  function validateRequired(input, fieldName, message) {
    let isValid = true;
    if (typeof input === "string" && input.trim() === "") {
      isValid = false;
    } else if (!input) {
      isValid = false;
    }

    setErrorMessages((prev) => ({
      ...prev,
      [fieldName]: {
        isValid,
        message: isValid ? "" : message,
      },
    }));

    return isValid;
  }

  const handleImagesChange = (newImages) => {
    updateItem({ media: newImages });
  };

  const steps = [
    <DetailsStep
      increaseItem={increaseItem}
      decreaseItem={decreaseItem}
      updateItem={updateItem}
      maxGuests={venueFormData.maxGuests}
      rating={venueFormData.rating}
      defaultValues={defaultValues ? defaultValues : venueFormData}
      errorMessages={errorMessages}
      key={0}
    />,
    <AmenitiesStep
      updateItem={updateItem}
      increaseItem={increaseItem}
      decreaseItem={decreaseItem}
      updateMeta={updateMeta}
      defaultValues={defaultValues ? defaultValues : venueFormData}
      key={1}
    />,
    <LocationStep
      key={2}
      updateLocation={updateLocation}
      defaultValues={defaultValues ? defaultValues : venueFormData}
    />,
    <ImagesStep
      key={3}
      handleImagesChange={handleImagesChange}
      images={venueFormData.media}
    />,
    <ReviewStep
      values={defaultValues ? defaultValues : venueFormData}
      key={4}
    />,
  ];

  const { step, back, next, currentStep, isLastStep, goTo } =
    useMultistepForm(steps);

  useEffect(() => {
    if (defaultValues) {
      updateVenueForm(defaultValues);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (!isLastStep) setError("");
  }, [isLastStep]);

  const handleNext = () => {
    if (validatePage(currentStep)) {
      next();
    }
  };

  function validatePage(step) {
    let isValid = true;
    if (step === 0) {
      isValid &= validateRequired(
        venueFormData.name,
        "name",
        "Please Write the name of the venue",
      );
      isValid &= validateRequired(
        venueFormData.description,
        "description",
        "A description is required",
      );
      isValid &= validateRequired(
        venueFormData.price,
        "price",
        "Price is required",
      );
      isValid &= validateRequired(
        venueFormData.maxGuests,
        "maxGuests",
        "Number of guests is required",
      );
    }
    return isValid;
  }

  const stepTitles = ["Details", "Amenities", "Address", "Images", "Review"];

  return (
    <div
      className={cn(
        "animate-in slide-in-from-bottom fixed inset-0 z-40 h-screen w-screen overflow-auto bg-card duration-300",
        isExiting && "animate-out  slide-out-to-bottom",
      )}
    >
      <div className="mx-auto hidden w-calc md:flex">
        <Link to={"/"} className="w-fit p-4">
          {" "}
          <img src="/holidayhelper-logo.svg" alt="" />
        </Link>
      </div>
      <form className="fixed inset-0 top-1/2 z-50 mx-auto grid h-[100dvh] max-h-[100dvh] w-full max-w-[600px] -translate-y-1/2 grid-rows-[1fr,auto] gap-4 rounded-xl bg-card p-2 py-4 md:w-calc md:p-8">
        <div className="overflow-y-auto">
          {" "}
          <button
            type="button"
            className=" flex items-center gap-1"
            onClick={() => {
              setIsExiting(true);
              setTimeout(() => {
                setIsExiting(false);
                handleBack();
              }, 300);
            }}
          >
            <FaChevronLeft /> <span className="border-b text-sm">Cancel</span>
          </button>
          {step}
        </div>
        <div className="grid gap-4">
          {errors && (
            <div className="text-red-500">
              {errors.map(({ message }, i) => (
                <p key={i}>{message}</p>
              ))}
            </div>
          )}
          <div>
            <div className="flex w-full">
              {steps.map((_, i) => (
                <GoToButton
                  disabled={!isStepOneValid}
                  current={i <= currentStep}
                  key={i}
                  number={i}
                  goTo={goTo}
                  title={stepTitles[i]}
                />
              ))}
            </div>
            <ProgressBar
              max={steps.length}
              current={currentStep + 1}
              progressStyle="rounded-e-none"
            />
          </div>
          <div className="flex w-full justify-between">
            <Button
              className="w-full "
              variant="ghost"
              type="button"
              onClick={back}
            >
              Back
            </Button>
            <h2 className="flex w-full items-center justify-center">
              {currentStep + 1} / {steps.length}
            </h2>
            {!isLastStep ? (
              <Button
                className="w-full bg-foreground text-background"
                variant="outline"
                type="button"
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                className="w-full"
                disabled={!isLastStep}
                type="button"
                onClick={onSubmit}
              >
                {status !== "pending" ? "Submit" : <Spinner />}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function GoToButton({ number, title, goTo, disabled, current }) {
  return (
    <button
      disabled={disabled}
      type="button"
      className={cn(
        "w-full border-x text-sm transition-all duration-300",
        current && "border-primary text-primary",
        number === 0 && "border-l-0",
        number === 4 && "border-r-0",
      )}
      onClick={() => goTo(number)}
    >
      {title}
    </button>
  );
}
