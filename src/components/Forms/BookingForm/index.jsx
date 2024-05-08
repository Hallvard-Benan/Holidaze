import Calendar from "../../DateRangePicker";
import PropTypes from "prop-types";
import { makeBooking } from "../../../api/bookings";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoundStore } from "../../../stores/store";
import Spinner from "../../ui/spinner";
import { useState, useEffect } from "react";

import { addDays, subDays } from "date-fns";

import BookingFormCard from "../../ui/bookingFormCard";

const BookingForm = ({
  disabledDates,
  venueId,
  maxGuests,
  price,
  disabled,
}) => {
  const [bookingFormState, setBookingFormState] = useState({
    dateFrom: subDays(new Date(), 0),
    dateTo: addDays(new Date(), 0),
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
          endDate: nextAvailableDate,
          key: "selection",
        },
      ]);
      setBookingFormState((state) => ({
        ...state,
        dateFrom: nextAvailableDate,
        dateTo: nextAvailableDate,
      }));

      console.log("", nextAvailableDate);
    }
  }, [disabledDates]);

  const {
    setError,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);

  const handleDateRangeChange = ({ startDate, endDate }) => {
    console.log("date from date range change", startDate);
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
    const utcFromDate = new Date(fromDate.getTime() + 2 * 60 * 60 * 1000);
    const utcToDate = new Date(toDate.getTime() + 2 * 60 * 60 * 1000);

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
  const totalPrice = numberOfNights > 0 ? numberOfNights * price : price;

  return (
    <form
      onSubmit={handleBooking}
      className="flex flex-col items-center gap-2 sm:flex-row"
    >
      {makeBookingMutation.status === "pending" && <Spinner />}

      <div className="">
        <Calendar
          state={calendarState}
          handleOnChange={handleOnChange}
          disabledDates={disabledDates}
        />
      </div>

      {!disabled && (
        <BookingFormCard
          guests={bookingFormState.guests}
          maxGuests={maxGuests}
          onUpdateGuests={handleUpdateGuests}
          isLoggedIn={isLoggedIn}
          onDecreaseGuests={() =>
            setBookingFormState((state) => ({
              ...state,
              guests: state.guests - 1,
            }))
          }
          onIncreaseGuests={() =>
            setBookingFormState((state) => ({
              ...state,
              guests: state.guests + 1,
            }))
          }
          errors={{ root: { errors: [{ message: "something went wrong" }] } }}
          nights={numberOfNights}
          price={price}
          total={totalPrice}
          disabled={disabled}
          dateFrom={bookingFormState.dateFrom}
          dateTo={bookingFormState.dateTo}
          status={makeBookingMutation.status}
        />
      )}
    </form>
  );
};

BookingForm.propTypes = {
  disabledDates: PropTypes.array,
  venueId: PropTypes.string,
  maxGuests: PropTypes.number,
  price: PropTypes.number,
  disabled: PropTypes.bool,
};

export default BookingForm;
