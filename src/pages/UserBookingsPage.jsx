import Spinner from "../components/ui/spinner";
import Card from "../components/Card";
import { cn, formatDate } from "../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import useUpcomingBookings from "../hooks/useUpcomingBookings";
import Container from "../components/ui/container";
import { CiCalendar } from "react-icons/ci";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import useDeleteBooking from "../hooks/useDeleteBookings";
import { useBoundStore } from "../stores/store";
import Bookings from "../components/Bookings";
import BookingsButtons from "../components/Bookings/buttons";
import useFilterBookings from "../hooks/useFilterBookings";

export default function UserBookingsPage() {
  const navigate = useNavigate();
  const { userName } = useParams();
  const myUserName = useBoundStore((state) => state.user.name);
  const { deleteMutation } = useDeleteBooking();

  const { bookings, status, error } = useUpcomingBookings(userName);
  useEffect(() => {
    document.title = "Holiday Helper | Bookings";
  }, []);

  const { renderedBookings, setBookingsToDisplay, bookingsToDisplay } =
    useFilterBookings(bookings);

  useEffect(() => {
    if (userName !== myUserName) navigate("/");
  }, [userName, myUserName, navigate]);

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

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="min-h-screen">
      <Container>
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Your Upcoming Bookings</h1>
        </div>{" "}
        <div
          className={cn(
            "grid gap-3 gap-y-6 transition-all duration-200 md:gap-y-8",
          )}
        >
          <div>
            <BookingsButtons
              bookingsToDisplay={bookingsToDisplay}
              setBookingsToDisplay={setBookingsToDisplay}
            />
          </div>
          <Bookings
            renderedBookings={renderedBookings}
            bookingsToDisplay={bookingsToDisplay}
          />
        </div>
      </Container>
    </div>
  );
}
