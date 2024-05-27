import { Link } from "react-router-dom";
import useUpcomingBookings from "../../hooks/useUpcomingBookings";
import { useBoundStore } from "../../stores/store";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";
import UpcomingBookingSkeleton from "./loading";
import BookingsCarouselUi from "./ui";
import { buttonVariants } from "../ui/button";
import { cn } from "../../utils/utils";

export default function UpcomingBookingsCarousel() {
  const userName = useBoundStore((state) => state.user.name);

  const { status, error, upcomingBookings } = useUpcomingBookings(userName);

  if (status === "error") return <div>error</div>;
  if (status === "pending") return <UpcomingBookingSkeleton />;
  if (status === "success" && upcomingBookings && upcomingBookings.length === 0)
    return (
      <div className="flex h-full w-full flex-col justify-between">
        <div className="w-full text-center text-xl font-semibold">
          No Upcoming trips yet
        </div>
        <div className="flex aspect-video w-full flex-col items-center">
          <img src="/traveling-transparrent.png" alt="" className="w-72" />
          <Link
            to={"/venues"}
            className={cn(
              buttonVariants({ variant: "outline" }),
              " rounded-xl border-muted-foreground bg-secondary text-primary",
            )}
          >
            Browse destinations
          </Link>
        </div>
      </div>
    );
  return <BookingsCarouselUi bookings={upcomingBookings} userName={userName} />;
}
