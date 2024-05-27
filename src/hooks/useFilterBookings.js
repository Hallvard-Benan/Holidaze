import { useState } from "react";

export default function useFilterBookings(bookings) {
  const [bookingsToDisplay, setBookingsToDisplay] = useState("upcoming");

  const upComingBookings = bookings.filter((booking) => {
    const today = new Date();
    const bookingDate = new Date(booking.dateFrom);
    return bookingDate > today;
  });
  const pastBookings = bookings.filter((booking) => {
    const today = new Date();
    const bookingDate = new Date(booking.dateFrom);
    return bookingDate < today;
  });

  const sortedBookings = (bookingsToSort) =>
    bookingsToSort.sort((bookingA, bookingB) => {
      const dateA = new Date(bookingA.dateFrom);
      const dateB = new Date(bookingB.dateFrom);
      return dateA - dateB;
    });

  const sortedUpComingBookings = sortedBookings(upComingBookings);
  const sortedPastBookings = sortedBookings(pastBookings);
  const renderedBookings =
    bookingsToDisplay === "upcoming"
      ? sortedUpComingBookings
      : sortedPastBookings;

  return { setBookingsToDisplay, renderedBookings, bookingsToDisplay };
}
