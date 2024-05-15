import Spinner from "../components/ui/spinner";
import Card from "../components/Card";
import { cn, formatDate } from "../utils/utils";
import { useParams } from "react-router-dom";
import useUpcomingBookings from "../hooks/useUpcomingBookings";
import Container from "../components/ui/container";
import { CiCalendar } from "react-icons/ci";
import { useEffect, useState } from "react";
import GridViewButtons from "../components/ui/grid-view-buttons";
import { Button } from "../components/ui/button";
import useDeleteBooking from "../hooks/useDeleteBookings";

export default function UserBookingsPage() {
  const { userName } = useParams();
  const [gridView, setGridView] = useState(false);

  const { deleteMutation } = useDeleteBooking();

  const { bookings, status, error } = useUpcomingBookings(userName);
  useEffect(() => {
    document.title = "Holiday Helper | Bookings";
  }, []);

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

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
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
            <div className="flex justify-between">
              <div className="flex gap-2">
                <CiCalendar />
                {`From ${formatDate(booking.dateFrom)} to: ${formatDate(booking.dateTo)}`}
              </div>

              <Button
                variant="destructive"
                onClick={() => handleDelete(booking.id)}
              >
                delete
              </Button>
            </div>
            <Card
              rating={booking.venue.rating}
              images={booking.venue.media}
              location={booking.venue.location}
              price={booking.venue.price}
              heading={booking.venue.name}
              href={`/venues/${booking.venue.id}`}
            ></Card>
          </div>
        ))}
      </div>
    </Container>
  );
}
