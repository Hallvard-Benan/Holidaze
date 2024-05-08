import Spinner from "../components/ui/spinner";
import Card from "../components/Card";
import { cn, formatDate } from "../utils/utils";
import { useParams } from "react-router-dom";
import useUpcomingBookings from "../hooks/useUpcomingBookings";
import Container from "../components/ui/container";
import { CiCalendar } from "react-icons/ci";
import { useState } from "react";
import GridViewButtons from "../components/ui/grid-view-buttons";

export default function UserBookingsPage() {
  const { userName } = useParams();
  const [gridView, setGridView] = useState(false);

  const { bookings, status, error } = useUpcomingBookings(userName);

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

  const toggleGridView = () => {
    setGridView((prev) => !prev);
  };

  return (
    <Container>
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Your Upcoming Bookings</h1>
        <GridViewButtons
          onClickGrid={toggleGridView}
          onClickList={toggleGridView}
          gridView={gridView}
        />
      </div>{" "}
      <div
        className={cn(
          "grid gap-3 gap-y-6 transition-all duration-200 md:gap-y-8",
          gridView && "grid-cols-2 md:grid-cols-3",
        )}
      >
        {bookings.map((booking) => (
          <div key={booking.id}>
            <div className="flex items-center gap-2">
              <CiCalendar />
              {`From ${formatDate(booking.dateFrom)} to: ${formatDate(booking.dateTo)}`}
            </div>
            <Card
              rating={booking.venue.rating}
              imgUrl={booking.venue.media[0].url}
              alt={booking.venue.media[0]?.alt}
              location={
                booking.venue.location.city +
                ", " +
                booking.venue.location.country
              }
              heading={booking.venue.name}
              href={`/venues/${booking.venue.id}`}
            ></Card>
          </div>
        ))}
      </div>
    </Container>
  );
}
