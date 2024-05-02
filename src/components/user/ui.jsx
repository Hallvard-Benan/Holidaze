import { Link } from "react-router-dom";
import Card from "../Card";

function ProfileUi({ name, avatar, credits, wins, bookings, venueManager }) {
  function formatDate(dateIn) {
    const date = new Date(dateIn);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Adding 1 to get the correct month
    const year = date.getFullYear();
    const dateOut = `${day}.${month}.${year}`;
    return dateOut;
  }

  const upComingBookings = bookings.filter((booking) => {
    const today = new Date();
    const bookingDate = new Date(booking.dateFrom);
    return bookingDate > today;
  });

  const sortedBookings = upComingBookings.sort((bookingA, bookingB) => {
    const dateA = new Date(bookingA.dateFrom);
    const dateB = new Date(bookingB.dateFrom);
    return dateA - dateB; // Sort in ascending order (booking closest to today first)
  });

  return (
    <div className="grid max-w-full gap-4 overflow-hidden">
      <div className="grid gap-2 md:flex md:justify-center md:gap-4">
        <div className="grid justify-items-center gap-2">
          <img
            src={
              avatar
                ? avatar.url
                : "https://cdn-icons-png.flaticon.com/512/17/17004.png"
            }
            alt={avatar ? avatar.alt : "profile image"}
            className={` h-44 rounded-lg transition-opacity duration-200 md:h-72 `}
          />
        </div>

        <div className="flex flex-col justify-center gap-4">
          <h1 className="break-all text-center text-4xl md:w-[400px] md:text-5xl">
            {name}
          </h1>
          <div className="mx-auto flex justify-evenly gap-16 rounded-lg bg-white p-4 md:gap-20">
            <div>
              <p className="text-center text-lg font-medium md:text-xl">
                {venueManager && <Link> My venues</Link>}
              </p>
              <p className="text-muted-foreground text-sm md:text-base">
                Listings
              </p>
            </div>
            <div>
              <p className="text-center text-lg font-medium md:text-xl">
                ${credits}
              </p>
              <p className="text-muted-foreground text-sm md:text-base">
                Credits
              </p>
            </div>
            <div>
              <p className="text-center text-lg font-medium md:text-xl">
                {wins}
              </p>
              <p className="text-muted-foreground text-sm md:text-base">Wins</p>
            </div>
          </div>
          <div>
            <h2>Your upcoming bookings</h2>
            {sortedBookings.map((booking) => (
              <Card
                key={booking.id}
                rating={booking.venue.rating}
                details={`booked from ${formatDate(booking.dateFrom)} to: ${formatDate(booking.dateTo)}`}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUi;
