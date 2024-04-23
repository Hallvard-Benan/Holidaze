import Calendar from "../../DateRangePicker";
import { makeBooking } from "../../../api";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoundStore } from "../../../stores/store";
import Spinner from "../../ui/spinner";
import { Link } from "react-router-dom";

export default function BookingForm({ disabledDates, venueId, maxGuests }) {
  const {
    setError,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const { updateDateTo, updateDateFrom } = useBoundStore();
  const bookingFormState = useBoundStore((state) => state.bookingFormState);
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);

  const handleDateRangeChange = (ranges) => {
    updateDateFrom(ranges.startDate);
    updateDateTo(ranges.endDate);
  };

  const makeBookingMutation = useMutation({
    mutationFn: makeBooking,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["venue", venueId] });
      console.log(res);
      setError({});
    },
    onError: (res) => {
      setError("root", {
        errors: res.response.data.errors,
      });
    },
  });

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

    // If dateFrom and dateTo are valid, proceed with form submission
    makeBookingMutation.mutate({
      ...bookingFormState,
      guests: parseInt(event.target.guests.value),
      venueId,
    });
  };

  return (
    <form onSubmit={handleBooking} className="flex flex-col items-center">
      {makeBookingMutation.status === "pending" && <Spinner />}

      <Calendar
        onChange={handleDateRangeChange}
        disabledDates={disabledDates}
      />
      <div>
        <label htmlFor="guests"> guests</label>

        <input
          type="number"
          min={1}
          max={maxGuests}
          name="guests"
          defaultValue={1}
          className="border p-2"
          placeholder="Number of guests"
        />
      </div>
      {errors?.root && (
        <div className="text-red-500">
          {errors.root.errors.map((m, i) => (
            <p key={i}>{m.message}</p>
          ))}
        </div>
      )}
      {isLoggedIn ? (
        <button
          type="submit"
          className="w-full rounded-md bg-blue-700 p-4 text-white"
        >
          Book
        </button>
      ) : (
        <div>
          <Link to={"/auth/login"}>Log in</Link>
          <Link to={"/auth/register"}>Register</Link>
        </div>
      )}
    </form>
  );
}
