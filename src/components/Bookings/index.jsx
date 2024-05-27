import { Link } from "react-router-dom";
import { VenuesGrid } from "../Venues/ui";
import CountdownTimer from "../ui/countDown";
import ProgressBar from "../ui/progressBar";
import { formatDate } from "../../utils/utils";
import { FaCalendar, FaUser } from "react-icons/fa";

export default function Bookings({ renderedBookings, bookingsToDisplay }) {
  return (
    <VenuesGrid className="gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {renderedBookings.map((booking) => (
        <div
          key={booking.id}
          className="items-centr flex w-full flex-col gap-2"
        >
          <div
            key={booking.id}
            className=" flex aspect-video w-full items-center justify-center overflow-hidden "
          >
            <Link
              to={`/venues/${booking.venue.id}`}
              className="relative flex h-full w-full max-w-full flex-col justify-end gap-2 overflow-hidden rounded-xl  bg-card  p-2"
            >
              <div className="z-10 flex w-fit flex-col justify-between overflow-hidden text-white">
                <h3 className=" w-full text-xl font-medium">
                  {booking.venue.name}
                </h3>
                {bookingsToDisplay === "upcoming" && (
                  <div className="flex w-full max-w-full gap-2 ">
                    <CountdownTimer endsAt={booking.dateFrom} />
                  </div>
                )}
              </div>
              {bookingsToDisplay === "upcoming" && (
                <div className="z-10 max-w-full">
                  <ProgressBar start={booking.created} end={booking.dateTo} />
                </div>
              )}
              <div className="absolute right-0 top-0 z-0 h-full w-full ">
                <div className="absolute h-full w-full bg-gradient-to-b from-gray-800/10 to-gray-800/80"></div>
                <img
                  src={
                    booking?.venue?.media[0]?.url
                      ? booking.venue.media[0].url
                      : "/noimage.png"
                  }
                  alt={
                    booking?.venue?.media[0]?.alt
                      ? booking.venue.media[0].alt
                      : ""
                  }
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>
          </div>
          <div className="flex justify-between px-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <p>{formatDate(booking.dateFrom)}</p>-
              <p> {formatDate(booking.dateTo)}</p>
              <FaCalendar />
            </div>
            <p className="flex items-center gap-1  text-muted-foreground">
              {booking.guests}
              <FaUser />
            </p>
          </div>
        </div>
      ))}
    </VenuesGrid>
  );
}
