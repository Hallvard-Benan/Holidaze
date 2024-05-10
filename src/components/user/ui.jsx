import { Link } from "react-router-dom";
import Card from "../Card";
import { formatDate } from "../../utils/utils";

import UpdateAvatarForm from "../Forms/UpdateAvatarForm";
function ProfileUi({
  name,
  avatar,
  banner,
  venues,
  bio,
  bookings,
  _count,
  venueManager,
  isMyProfile,
}) {
  const upComingBookings = bookings.filter((booking) => {
    const today = new Date();
    const bookingDate = new Date(booking.dateFrom);
    return bookingDate > today;
  });

  const sortedBookings = upComingBookings.sort((bookingA, bookingB) => {
    const dateA = new Date(bookingA.dateFrom);
    const dateB = new Date(bookingB.dateFrom);
    return dateA - dateB;
  });

  return (
    <div className="relative mx-auto grid  w-calc gap-4 overflow-hidden">
      <div>
        <img
          className="h-80 w-full rounded-b-md object-cover"
          src={banner?.url}
          alt={banner.alt ? banner.alt : "Banner image"}
        />
        <div className="grid gap-2 md:flex md:justify-center md:gap-4">
          <div className="absolute left-6 -translate-y-1/2">
            <img
              src={
                avatar
                  ? avatar.url
                  : "https://cdn-icons-png.flaticon.com/512/17/17004.png"
              }
              alt={avatar.alt ? avatar.alt : "profile image"}
              className={`aspect-square h-44 rounded-full border border-white object-cover `}
            />
            {isMyProfile && (
              <UpdateAvatarForm
                userName={name}
                className="absolute bottom-1  right-0 text-xl"
              />
            )}
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
                  {_count.venues}
                </p>
                <p className="text-muted-foreground text-sm md:text-base">
                  Venues
                </p>
              </div>
              <div>
                <p className="text-center text-lg font-medium md:text-xl">
                  {_count.bookings}
                </p>
                <p className="text-muted-foreground text-sm md:text-base">
                  Bookings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMyProfile && (
        <div>
          <h2 className="text-xl">Your upcoming bookings:</h2>
          {sortedBookings.map((booking) => (
            <Card
              key={booking.id}
              rating={booking.venue.rating}
              images={booking.venue.media}
              price={booking.venue.price}
              location={booking.venue.location}
              heading={booking.venue.name}
              href={`/venues/${booking.venue.id}`}
            ></Card>
          ))}
        </div>
      )}
      <div>
        <h2 className="text-xl">{name}s Venues:</h2>
        {venues.map((venue) => (
          <Card
            key={venue.id}
            rating={venue.rating}
            images={venue.media}
            location={venue.location}
            price={venue.price}
            heading={venue.name}
            href={`/venues/${venue.id}`}
          ></Card>
        ))}
      </div>
    </div>
  );
}

export default ProfileUi;
