import React from "react";
import { Button } from "./button";
import { Input } from "./input";

export default function NumberButtons({
  onIncrease,
  onDecrease,
  value,
  maxValue,
  disabled,
}) {
  console.log(value);

  return (
    <div className="flex items-center justify-center">
      <Button
        disabled={value === maxValue || disabled}
        type="button"
        variant="outline"
        className="border-muted-foreground h-[45px] w-[45px] rounded-full border text-xl font-bold"
        onClick={() => {
          console.log("value", value);
          onIncrease();
        }}
      >
        <p>+</p>
      </Button>

      <Input
        className="flex items-center justify-center pr-0 text-center"
        type="number"
        min={1}
        max={maxValue}
        name="guests"
        disabled
        value={value}
      />

      <Button
        disabled={value === 1}
        type="button"
        variant="outline"
        className="h-[45px] w-[45px] rounded-full border border-black text-xl font-bold"
        onClick={() => {
          console.log("value", value);
          onDecrease();
        }}
      >
        -
      </Button>
    </div>
  );
}
