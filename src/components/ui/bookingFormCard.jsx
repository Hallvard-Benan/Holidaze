import React from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Link } from "react-router-dom";
import Spinner from "./spinner";
import { formatDate } from "../../utils/utils";
import { Separator } from "./seperator";

export default function BookingFormCard({
  status,
  maxGuests,
  onUpdateGuests,
  disabled,
  guests,
  errors,
  onIncreaseGuests,
  isLoggedIn,
  dateFrom,
  price,
  total,
  nights,
  dateTo,
  onDecreaseGuests,
}) {
  return (
    <div className="bg-card flex w-full flex-col gap-6 rounded-md border border-muted p-6">
      <div className="flex justify-between">
        <div>
          <label htmlFor="guests" className="font-semibold">
            From:
          </label>
          <p className="font-normal text-gray-600">{formatDate(dateFrom)}</p>
        </div>
        <div>
          <label htmlFor="guests" className="font-semibold">
            Guests:
          </label>
          <p className="font-normal text-gray-600">{formatDate(dateTo)}</p>
        </div>
      </div>
      <div className="col-span-1 flex justify-between">
        <div>
          <label htmlFor="guests" className="font-semibold">
            Guests:
          </label>
          <p className="font-normal text-gray-600">Max {maxGuests}</p>
        </div>
        <div className="flex items-center justify-center">
          <Button
            disabled={guests === maxGuests || disabled}
            type="button"
            variant="outline"
            className="border-muted-foreground h-[45px] w-[45px] rounded-full border text-xl font-bold"
            onClick={onIncreaseGuests}
          >
            <p>+</p>
          </Button>

          <Input
            className="flex items-center justify-center pr-0 text-center"
            type="number"
            min={1}
            onChange={onUpdateGuests}
            max={maxGuests}
            name="guests"
            disabled
            value={guests}
            placeholder="Number of guests"
          />

          <Button
            disabled={guests === 1}
            type="button"
            variant="outline"
            className="h-[45px] w-[45px] rounded-full border border-black text-xl font-bold"
            onClick={onDecreaseGuests}
          >
            -
          </Button>
        </div>
      </div>

      <Separator />

      <p>
        {" "}
        {price} ,- / night x {nights}
      </p>

      <div className="flex justify-between text-xl">
        <h3 className="font-semibold">Total</h3>
        <p>{total} kr</p>
      </div>

      {isLoggedIn ? (
        <>
          <Button
            disabled={disabled}
            type="submit"
            className="col-span-2 h-[48px] w-full rounded-md"
          >
            {status === "pending" ? <Spinner /> : "Book"}
          </Button>
        </>
      ) : (
        <div>
          <Link to={"/auth/login"}>Log in</Link>
          <Link to={"/auth/register"}>Register</Link>
        </div>
      )}

      {errors?.root && (
        <div className="text-red-500">
          {errors.root.errors.map((m, i) => (
            <p key={i}>{m.message}</p>
          ))}
        </div>
      )}
    </div>
  );
}
