import useUser from "../hooks/useUser";
import Spinner from "../components/ui/spinner";
import Card from "../components/Card";
import { formatDate } from "../utils/utils";
import { useParams } from "react-router-dom";

export default function UserBookingsPage() {
  const { userName } = useParams();

  const { data, status, error } = useUser(userName);

  if (status === "pending") return <Spinner />;
  if (status === "error")
    return (
      <div>
        {error.message}{" "}
        {error.response?.data?.errors.map((e, i) => (
          <p key={i}>{e.message}</p>
        ))}{" "}
      </div>
    );

  const sortedBookings = filterBookings(data.data.data.bookings);

  return (
    <div>
      {sortedBookings.map((booking) => (
        <Card
          key={booking.id}
          rating={booking.venue.rating}
          details={`booked from ${formatDate(booking.dateFrom)} to: ${formatDate(booking.dateTo)}`}
          imgUrl={booking.venue.media[0].url}
          alt={booking.venue.media[0]?.alt}
          location={
            booking.venue.location.city + ", " + booking.venue.location.country
          }
          heading={booking.venue.name}
          href={`/venues/${booking.venue.id}`}
        ></Card>
      ))}
    </div>
  );
}

function filterBookings(bookingsToFilter) {
  const upComingBookings = bookingsToFilter.filter((booking) => {
    const today = new Date();
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
