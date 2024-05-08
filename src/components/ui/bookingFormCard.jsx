import React from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Link } from "react-router-dom";
import Spinner from "./spinner";
import { formatDate } from "../../utils/utils";
import { Separator } from "./seperator";
import NumberButtons from "./numberButtons";

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
        <NumberButtons
          onIncrease={onIncreaseGuests}
          onDecrease={onDecreaseGuests}
          maxValue={maxGuests}
          value={guests}
        />
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
