import useUpcomingBookings from "../../hooks/useUpcomingBookings";
import { useBoundStore } from "../../stores/store";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";
import UpcomingBookingSkeleton from "./loading";
import BookingsCarouselUi from "./ui";

export default function UpcomingBookingsCarousel() {
  const userName = useBoundStore((state) => state.user.name);

  const { status, error, bookings } = useUpcomingBookings(userName);

  if (status === "error") return <div>error</div>;
  if (status === "pending") return <UpcomingBookingSkeleton />;
  if (status === "success" && bookings && bookings.length === 0)
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="w-full text-center text-xl font-semibold">
          No Upcoming trips yet
        </div>
        <div className="flex aspect-video w-full flex-col items-center gap-4">
          <img src="/public/traveling-transparrent.png" alt="" />
          <Button>Browse destinations</Button>
        </div>
      </div>
    );
  return <BookingsCarouselUi bookings={bookings} userName={userName} />;
}
