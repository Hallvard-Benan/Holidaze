import { useEffect, useState } from "react";
import { useBoundStore } from "../../../stores/store";
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

export default function CreateVenueForm({
  onSubmit,
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
  useEffect(() => {
    if (defaultValues) console.log(defaultValues.media);
  }, [defaultValues]);

  const [errorMessages, setErrorMessages] = useState({});

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

  const { step, back, next, currentStep, isLastStep } = useMultistepForm(steps);

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
    // Add validations for other steps if needed
    return isValid;
  }

  return (
    <form className="mx-auto mt-[0.5rem] grid h-[calc(100dvh-100px)] max-h-[100dvh] w-calc max-w-[800px] grid-rows-[1fr,auto] gap-4 rounded-xl bg-card p-8 sm:h-[calc(100dvh-80px)]">
      <div className="overflow-y-auto">{step}</div>
      <div className="grid gap-4">
        {errors && (
          <div className="text-red-500">
            {errors.map(({ message }, i) => (
              <p key={i}>{message}</p>
            ))}
          </div>
        )}
        <ProgressBar max={steps.length} current={currentStep + 1} />
        <div className="flex w-full justify-between">
          <Button
            className="w-full"
            variant="outline"
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
              className="w-full"
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
  );
}
