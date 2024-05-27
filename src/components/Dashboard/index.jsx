import useUpcomingBookings from "../../hooks/useUpcomingBookings";
import UpcomingBookingsCarousel from "../UpcomingBookingsCarousel";
import { Separator } from "../ui/seperator";
import YourVenuesDashboard from "../YourVenuesDashboard";
import { cn } from "../../utils/utils";
import { useBoundStore } from "../../stores/store";

export function Dashboard() {
  const userName = useBoundStore((state) => state.user.name);
  const venuesNumber = useBoundStore((state) => state.user?._count?.venues);
  const venueManager = useBoundStore((state) => state.user.venueManager);
  const { upcomingBookings } = useUpcomingBookings(userName);
  return (
    <>
      {upcomingBookings.length > 0 || venueManager ? (
        <div className="grid gap-8">
          <div
            className={cn(
              "relative flex w-full max-w-full flex-col gap-8 overflow-hidden sm:gap-16 md:flex-row",
              !venueManager && "mx-auto max-w-[400px]",
            )}
          >
            <UpcomingBookingsCarousel />

            <Separator
              orientation="vertical"
              className={cn(
                "absolute left-1/2 hidden h-full w-[1px] -translate-x-1/2 bg-[#E8E8E8] md:block",
                !venueManager && "hidden md:hidden",
              )}
            />
            {venueManager && (
              <div className="w-full">
                <YourVenuesDashboard
                  userName={userName}
                  venuesNumber={venuesNumber}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
