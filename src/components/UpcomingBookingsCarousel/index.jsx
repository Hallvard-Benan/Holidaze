import useUpcomingBookings from "../../hooks/useUpcomingBookings";
import { useBoundStore } from "../../stores/store";
import Spinner from "../ui/spinner";
import BookingsCarouselUi from "./ui";

export default function UpcomingBookingsCarousel() {
  const userName = useBoundStore((state) => state.user.name);

  const { status, error, bookings } = useUpcomingBookings(userName);

  if (status === "error") return <div>error</div>;
  if (status === "pending") return <Spinner />;

  return <BookingsCarouselUi bookings={bookings} />;
}
