import React from "react";
import { cn } from "../../utils/utils";

export default function BookingsButtons({
  bookingsToDisplay,
  setBookingsToDisplay,
}) {
  return (
    <>
      <button
        className={cn(
          "border-b px-2 font-light transition-all duration-300 hover:text-primary",
          bookingsToDisplay === "upcoming" &&
            "border-b border-primary  hover:text-current",
        )}
        onClick={() => setBookingsToDisplay("upcoming")}
      >
        Upcoming
      </button>
      <button
        className={cn(
          "border-b px-2 font-light transition-all duration-300 hover:text-primary",
          bookingsToDisplay === "past" &&
            "border-b border-primary  hover:text-current",
        )}
        onClick={() => setBookingsToDisplay("past")}
      >
        Previous
      </button>
    </>
  );
}
