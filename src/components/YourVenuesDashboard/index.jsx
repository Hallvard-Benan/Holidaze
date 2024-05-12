import React from "react";
import useVenuesByProfile from "../../hooks/useVenuesByProfile";
import Spinner from "../ui/spinner";

export default function YourVenuesDashboard({ userName }) {
  const { data, error, status } = useVenuesByProfile(userName);

  if (status === "pending") return <Spinner />;
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
    <div className="flex gap-2 rounded-md border p-4">
      Your venues have <span className="font-bold">{bookingsCount}</span>{" "}
      bookings see all + {incomingMoney.toLocaleString()} kr
    </div>
  );
}
