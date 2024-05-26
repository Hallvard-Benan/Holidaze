import { Button } from "./button";
import { Link } from "react-router-dom";
import Spinner from "./spinner";
import { formatDate } from "../../utils/utils";
import { Separator } from "./seperator";
import NumberButtons from "./numberButtons";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./dialog";
import { buttonVariants } from "./button";

export default function BookingFormCard({
  status,
  maxGuests,
  disabled,
  guests,
  errors,
  onIncreaseGuests,
  isLoggedIn,
  dateFrom,
  price,
  total,
  onSubmit,
  nights,
  post,
  dateTo,
  onDecreaseGuests,
}) {
  return (
    <div className="flex w-full flex-col gap-6 rounded-md border border-muted bg-card p-6">
      <div className="flex justify-between">
        <div>
          <label htmlFor="guests" className="font-semibold">
            From:
          </label>
          <p className="font-normal text-gray-600">{formatDate(dateFrom)}</p>
        </div>
        <div>
          <label htmlFor="guests" className="font-semibold">
            to:
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
          <ConfirmBookingForm
            disabled={disabled}
            onSubmit={onSubmit}
            post={post}
            total={total}
            guests={guests}
            nights={nights}
            dateFrom={dateFrom}
            dateTo={dateTo}
            errors={errors}
            status={status}
          />
        </>
      ) : (
        <div className="space-y-2">
          <p className="text-muted-foreground">
            Log in or register to make a booking
          </p>
          <div className="flex gap-2">
            <Link to={"/auth/login"} className={buttonVariants()}>
              Log in
            </Link>
            <Link
              to={"/auth/register"}
              className={buttonVariants({ variant: "outline" })}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function ConfirmBookingForm({
  dateFrom,
  dateTo,
  post,
  total,
  nights,
  errors,
  disabled,
  status,
  guests,
  onSubmit,
}) {
  const image = post?.media[0] ? post.media[0] : { url: "/noimage.png" };

  return (
    <Dialog>
      <DialogTrigger asChild className="">
        <Button type="button">Continue</Button>
      </DialogTrigger>
      <DialogContent className="my-4 max-h-[90dvh] gap-0 divide-y overflow-auto">
        <h2 className={"py-4 text-center text-xl font-semibold"}>
          Booking Overview
        </h2>
        <div className="flex gap-4 py-4">
          <div className="size-24 overflow-hidden rounded-lg border border-gray-400">
            <img
              className=" size-full object-cover"
              src={image.url}
              alt={image.alt}
            />
          </div>
          <div>
            <h2 className="font-semibold">{post.name}</h2>
            <p className=" text-muted-foreground ">Nights: {nights}</p>
            <div className="">Kr {post.price}</div>
          </div>
        </div>
        <div className="flex items-center justify-between py-4">
          <p className="font-semibold">Guests:</p>
          <p className="text-muted-foreground">{guests}</p>
        </div>
        <div className="flex flex-col  gap-2 py-4">
          <div className="flex justify-between">
            <label htmlFor="guests" className="font-semibold">
              From:
            </label>
            <p className="font-normal text-gray-600">{formatDate(dateFrom)}</p>
          </div>

          <div className="flex justify-between">
            <label htmlFor="guests" className="font-semibold">
              To
            </label>
            <p className="font-normal text-gray-600">{formatDate(dateTo)}</p>
          </div>
        </div>
        <div className="my-2 flex flex-col gap-6 py-4">
          <div className="flex justify-between">
            <p className="font-semibold">Total:</p>
            <div className="text-lg font-semibold">kr {total}</div>
          </div>

          {errors?.root && (
            <div className="text-red-500">
              {errors.root.errors.map((m, i) => (
                <p key={i}>{m.message}</p>
              ))}
            </div>
          )}
          <Button onClick={onSubmit} disabled={disabled}>
            {status === "pending" ? <Spinner /> : "Confirm Booking"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
