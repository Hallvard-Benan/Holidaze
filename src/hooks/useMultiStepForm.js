import { useState } from "react";

export function useMultistepForm(steps) {
  const [currentStep, setCurrentStep] = useState(0);

  function next() {
    setCurrentStep((curr) => {
      if (curr === steps.length - 1) return curr;
      return curr + 1;
    });
  }

  function back() {
    setCurrentStep((curr) => {
      if (curr === 0) return curr;
      return curr - 1;
    });
  }

  function goTo(step) {
    setCurrentStep(step);
  }

  return {
    currentStep,
    step: steps[currentStep],
    goTo,
    back,
    next,
    isLastStep: currentStep === steps.length - 1,
    isFirstStep: currentStep === 0,
  };
}
