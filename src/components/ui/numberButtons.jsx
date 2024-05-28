import { Button } from "./button";

export default function NumberButtons({
  onIncrease,
  onDecrease,
  value,
  maxValue,
  disabled,
  label = "",
  errorMessage,
}) {
  return (
    <div>
      <div className="flex w-full items-center justify-between gap-2">
        {label}
        <div className="flex items-center gap-4">
          <Button
            disabled={value === 1}
            type="button"
            variant="outline"
            className="size-[45px] rounded-full border border-black text-xl font-bold"
            onClick={() => {
              onDecrease();
            }}
          >
            -
          </Button>
          <p className="text-lg tabular-nums">{value}</p>

          <Button
            disabled={value === maxValue || disabled}
            type="button"
            variant="outline"
            className="size-[45px] rounded-full border border-muted-foreground text-xl font-bold"
            onClick={() => {
              onIncrease();
            }}
          >
            <p>+</p>
          </Button>
        </div>
      </div>
      {errorMessage && <p className="text-destructive">{errorMessage}</p>}
    </div>
  );
}
