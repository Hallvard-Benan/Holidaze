import React from "react";
import useVenuesByProfile from "../../hooks/useVenuesByProfile";
import Spinner from "../ui/spinner";
import { Button } from "../ui/button";
import VenuesDashboardSkeleton from "./loading";
import { buttonVariants } from "../ui/button";
import { cn } from "../../utils/utils";
import { Link } from "react-router-dom";

export default function YourVenuesDashboard({ userName, venuesNumber }) {
  const { data, error, status } = useVenuesByProfile(userName);

  if (status === "pending") return <VenuesDashboardSkeleton />;
  if (status === "error") return <div>error</div>;

  const bookingsCount = data.data.data.reduce(
    (acc, curr) => (acc += curr._count.bookings),
    0,
  );

  function nightsStayed(from, to) {
    const start = new Date(from);
    const end = new Date(to);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 1;

    return diffDays;
  }

  function calculateTotalNights(bookings) {
    if (!bookings || !bookings.length) return 0; // If bookings array is empty or undefined, return 0
    return bookings.reduce(
      (acc, curr) => (acc += nightsStayed(curr.dateFrom, curr.dateTo)),
      0,
    );
  }

  const incomingMoney = data.data.data.reduce((acc, curr) => {
    return acc + curr.price * calculateTotalNights(curr.bookings);
  }, 0);

  return (
    <div className="grid h-full w-full grid-rows-[auto,1fr,auto] gap-4 sm:gap-8 ">
      <h3 className="text-center text-xl font-semibold">Your Venues</h3>
      <div className="flex gap-4 md:gap-8">
        <VenuesDashboardCard>
          <h4 className="text-xl font-bold md:text-2xl">{bookingsCount}</h4>
          <p className="text-sm text-muted-foreground  md:text-base">
            Upcoming Bookings
          </p>
        </VenuesDashboardCard>
        <VenuesDashboardCard>
          <h4 className="text-xl font-bold md:text-2xl">
            {incomingMoney.toLocaleString()} kr
          </h4>
          <p className="text-sm text-muted-foreground md:text-base">
            Total Revenue
          </p>
        </VenuesDashboardCard>
      </div>

      <Link
        to={venuesNumber > 0 ? `/profiles/${userName}/venues` : "/new-venue"}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "h-14 rounded-xl border-muted-foreground bg-secondary text-primary",
        )}
      >
        {venuesNumber > 0 ? "See More" : "Add New Venue"}
      </Link>
    </div>
  );
}

export function VenuesDashboardCard({ children }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl bg-card p-4 md:p-0">
      {children}
    </div>
  );
}
