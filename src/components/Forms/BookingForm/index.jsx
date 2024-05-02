import Calendar from "../../DateRangePicker";
import PropTypes from "prop-types";
import { makeBooking } from "../../../api/bookings";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoundStore } from "../../../stores/store";
import Spinner from "../../ui/spinner";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { addDays, subDays } from "date-fns";

const BookingForm = ({ disabledDates, venueId, maxGuests, price }) => {
  const [bookingFormState, setBookingFormState] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1,
    venueId,
  });
  const [calendarState, setCalendarState] = useState([
    {
      startDate: subDays(new Date(), 0),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const today = new Date();
    const tomorrow = addDays(today, 1);

    // Check if today is included in disabledDates
    if (disabledDates.includes(today.toISOString().split("T")[0])) {
      let nextAvailableDate = tomorrow;
      while (
        disabledDates.includes(nextAvailableDate.toISOString().split("T")[0])
      ) {
        nextAvailableDate = addDays(nextAvailableDate, 1);
      }
      setCalendarState([
        {
          startDate: nextAvailableDate,
          endDate: addDays(nextAvailableDate, 1),
          key: "selection",
        },
      ]);
    }
  }, [disabledDates]);

  const {
    setError,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);

  const handleDateRangeChange = ({ startDate, endDate }) => {
    setBookingFormState((state) => ({
      ...state,
      dateFrom: startDate,
      dateTo: endDate,
    }));
  };

  const handleUpdateGuests = (e) => {
    const guestsNumber = e.currentTarget.value;
    setBookingFormState((state) => ({ ...state, guests: guestsNumber }));
  };

  const makeBookingMutation = useMutation({
    mutationFn: makeBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["venue", venueId] });

      setError("root", { errors: [] });
    },
    onError: (res) => {
      setError("root", {
        errors: res.response.data.errors,
      });
    },
  });

  const handleOnChange = (ranges) => {
    const { selection } = ranges;

    handleDateRangeChange(selection);
    setCalendarState([selection]);
  };

  const handleBooking = async (event) => {
    event.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates only

    // Check if dateFrom or dateTo is before today
    if (
      new Date(bookingFormState.dateFrom) < today ||
      new Date(bookingFormState.dateTo) < today
    ) {
      setError("root", {
        errors: [
          {
            message: `Booking cannot be before todays date: ${today.getDate()}.${today.getMonth()}.${today.getFullYear()}`,
          },
        ],
      });
      return; // Exit function without submitting the form
    }

    if (bookingFormState.guests < 1 || bookingFormState.guests > maxGuests) {
      setError("root", {
        errors: [
          {
            message: `Can only be booked for 1 to ${maxGuests} guests}`,
          },
        ],
      });
    }

    const fromDate = new Date(calendarState[0].startDate);
    const toDate = new Date(calendarState[0].endDate);

    // Add two hours to both fromDate and toDate
    const utcFromDate = new Date(fromDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours in milliseconds
    const utcToDate = new Date(toDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours in milliseconds

    makeBookingMutation.mutate({
      ...bookingFormState,
      dateFrom: utcFromDate.toUTCString(),
      dateTo: utcToDate.toUTCString(),
    });
  };

  const startDate = new Date(calendarState[0].startDate);
  const endDate = new Date(calendarState[0].endDate);
  const numberOfNights = Math.ceil(
    (endDate - startDate) / (1000 * 60 * 60 * 24),
  );

  // Calculate the total price
  const totalPrice = numberOfNights * price;

  return (
    <form
      onSubmit={handleBooking}
      className="flex flex-col flex-wrap items-center gap-2"
    >
      {makeBookingMutation.status === "pending" && <Spinner />}

      <div className="">
        <Calendar
          state={calendarState}
          handleOnChange={handleOnChange}
          disabledDates={disabledDates}
        />
      </div>

      <div className="grid w-full min-w-[220px] max-w-[350px] gap-4 rounded-md border border-black p-2">
        <h3 className="col-span-2 text-lg font-semibold">
          {price} kr per night
        </h3>
        <div className="col-span-2 grid">
          <label htmlFor="guests" className="font-semibold">
            {" "}
            Guests:{" "}
            <span className="font-normal text-gray-600">max {maxGuests}</span>
          </label>
          <div className="col-span-2 flex justify-between">
            <input
              type="number"
              min={1}
              onChange={handleUpdateGuests}
              max={maxGuests}
              name="guests"
              value={bookingFormState.guests}
              className="border p-2"
              placeholder="Number of guests"
            />
            <div>
              <button
                disabled={bookingFormState.guests === maxGuests}
                type="button"
                className="h-[45px] w-[45px] rounded-full border border-black text-xl font-bold"
                onClick={() =>
                  setBookingFormState((state) => ({
                    ...state,
                    guests: state.guests + 1,
                  }))
                }
              >
                +
              </button>
              <button
                disabled={bookingFormState.guests === 1}
                type="button"
                className="h-[45px] w-[45px] rounded-full border border-black text-xl font-bold"
                onClick={() =>
                  setBookingFormState((state) => ({
                    ...state,
                    guests: state.guests - 1,
                  }))
                }
              >
                -
              </button>
            </div>
          </div>
        </div>

        <div>Number of nights: {numberOfNights}</div>
        <div>Total: {totalPrice}</div>

        {errors?.root && (
          <div className="text-red-500">
            {errors.root.errors.map((m, i) => (
              <p key={i}>{m.message}</p>
            ))}
          </div>
        )}

        {isLoggedIn ? (
          <>
            <button
              type="submit"
              className="col-span-2 rounded-md bg-blue-700 p-4 text-white"
            >
              {makeBookingMutation.status === "pending" ? <Spinner /> : "Book"}
            </button>
          </>
        ) : (
          <div>
            <Link to={"/auth/login"}>Log in</Link>
            <Link to={"/auth/register"}>Register</Link>
          </div>
        )}
      </div>
    </form>
  );
};

BookingForm.propTypes = {
  disabledDates: PropTypes.array,
  venueId: PropTypes.string,
  maxGuests: PropTypes.number,
  price: PropTypes.number,
};

export default BookingForm;
