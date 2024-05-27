import { useState, useEffect } from "react";
import useUser from "./useUser";

export default function useUpcomingBookings(userName) {
  const { status, error, data } = useUser(userName);
  const [upcomingBookings, setUpComingBookings] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (status === "success" && data) {
      const filteredBookings = filterBookings(data.data.data.bookings);
      setUpComingBookings(filteredBookings);
      setBookings(data.data.data.bookings);
    }
  }, [status, data]);

  function filterBookings(bookingsToFilter) {
    const today = new Date();
    const upComingBookings = bookingsToFilter.filter((booking) => {
      const bookingDate = new Date(booking.dateFrom);
      return bookingDate > today;
    });

    const sortedBookings = upComingBookings.sort((bookingA, bookingB) => {
      const dateA = new Date(bookingA.dateFrom);
      const dateB = new Date(bookingB.dateFrom);
      return dateA - dateB;
    });

    return sortedBookings;
  }

  return { status, error, bookings, upcomingBookings };
}
