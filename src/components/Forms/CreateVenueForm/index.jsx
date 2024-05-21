import { useEffect, useState } from "react";
import Images from "../Images";
import { useBoundStore } from "../../../stores/store";
import { InputGroup, TextAreaGroup } from "../../ui/inputGroup";
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
}) {
  const { updateItem, updateMeta, updateLocation, updateVenueForm } =
    useBoundStore();
  const [images, setImages] = useState(
    defaultValues ? defaultValues.media : [],
  );

  const handleImagesChange = (newImages) => {
    setImages(newImages);
    updateItem({ media: newImages });
  };
  const steps = [
    <DetailsStep
      updateItem={updateItem}
      defaultValues={defaultValues}
      key={0}
    />,
    <AmenitiesStep
      updateItem={updateItem}
      updateMeta={updateMeta}
      defaultValues={defaultValues}
      key={1}
    />,
    <LocationStep
      key={2}
      updateLocation={updateLocation}
      defaultValues={defaultValues}
    />,
    <ImagesStep
      key={3}
      handleImagesChange={handleImagesChange}
      images={images}
    />,
    <ReviewStep key={4} />,
  ];
  const { step, goTo, back, next, currentStep, isFirstStep, isLastStep } =
    useMultistepForm(steps);

  useEffect(() => {
    if (defaultValues) {
      updateVenueForm(defaultValues);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (!isLastStep) setError("");
  }, [isLastStep]);

  return (
    <form className=" mx-auto mt-[0.5rem] grid h-[calc(100dvh-100px)] max-h-[100dvh] w-calc max-w-[800px] grid-rows-[1fr,auto] gap-4 rounded-xl bg-card p-8 sm:h-[calc(100dvh-80px)] ">
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
          <Button variant="outline" type="button" onClick={back}>
            back
          </Button>
          <h2>
            {currentStep + 1} / {steps.length}
          </h2>
          {!isLastStep ? (
            <Button variant="outline" type="button" onClick={next}>
              next
            </Button>
          ) : (
            <Button disabled={!isLastStep} type="button" onClick={onSubmit}>
              {status !== "pending" ? "Submit" : <Spinner />}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
