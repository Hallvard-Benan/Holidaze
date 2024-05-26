import { Link } from "react-router-dom";
import Card from "../Card";
import { cn, formatDate } from "../../utils/utils";

import UpdateAvatarForm from "../Forms/UpdateAvatarForm";
import { VenuesGrid } from "../Venues/ui";
import { useState } from "react";
import CountdownTimer from "../ui/countDown";
import ProgressBar from "../ui/progressBar";
import { FaCalendar, FaCheck, FaEdit, FaSearch, FaUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Button, buttonVariants } from "../ui/button";
import useUpdateUser from "../../hooks/useUpdateUser";
import { toast } from "sonner";
function ProfileUi({
  name,
  avatar,
  banner,
  venues,
  bio,
  bookings,
  isMyProfile,
}) {
  const [bookingsToDisplay, setBookingsToDisplay] = useState("upcoming");

  const upComingBookings = bookings.filter((booking) => {
    const today = new Date();
    const bookingDate = new Date(booking.dateFrom);
    return bookingDate > today;
  });
  const pastBookings = bookings.filter((booking) => {
    const today = new Date();
    const bookingDate = new Date(booking.dateFrom);
    return bookingDate < today;
  });

  const sortedBookings = (bookingsToSort) =>
    bookingsToSort.sort((bookingA, bookingB) => {
      const dateA = new Date(bookingA.dateFrom);
      const dateB = new Date(bookingB.dateFrom);
      return dateA - dateB;
    });

  const sortedUpComingBookings = sortedBookings(upComingBookings);
  const sortedPastBookings = sortedBookings(pastBookings);
  const renderedBookings =
    bookingsToDisplay === "upcoming"
      ? sortedUpComingBookings
      : sortedPastBookings;

  return (
    <div className="relative mx-auto grid  w-calc gap-4 overflow-hidden">
      <div className="space-y-8">
        <div className="relative h-48 w-full rounded-b-md object-cover sm:h-80">
          <img
            className="h-48 w-full rounded-b-md object-cover sm:h-80"
            src={banner?.url}
            alt={banner.alt ? banner.alt : "Banner image"}
          />
          {isMyProfile && (
            <UpdateAvatarForm
              image={banner}
              variant="banner"
              userName={name}
              className="absolute right-2 top-2  p-3 text-base md:text-xl"
            />
          )}
        </div>
        <div className="grid gap-2  md:gap-4">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-full ">
            <img
              src={
                avatar
                  ? avatar.url
                  : "https://cdn-icons-png.flaticon.com/512/17/17004.png"
              }
              alt={avatar.alt ? avatar.alt : "profile image"}
              className={`size-24 rounded-full border border-white object-cover md:size-40 `}
            />
            {isMyProfile && (
              <UpdateAvatarForm
                variant={"avatar"}
                image={avatar}
                userName={name}
                className="absolute bottom-1  right-0 p-3 text-base md:text-xl"
              />
            )}
          </div>
          <div className="flex flex-col justify-center divide-y ">
            <h1 className="break-all py-6 text-center text-4xl  sm:py-8 md:text-5xl">
              {name}
            </h1>

            <UserBio bio={bio} isMyProfile={isMyProfile} userName={name} />

            {isMyProfile && (
              <div className="space-y-4 py-6 sm:py-8">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <h2 className="text-xl">Your Bookings:</h2>
                  <div className="">
                    {bookings.length === 0 ? (
                      <Link
                        to={"/venues"}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "gap-1",
                        )}
                      >
                        Find a venue <FaSearch />
                      </Link>
                    ) : (
                      <>
                        <button
                          className={cn(
                            "border-b px-2 font-light transition-all duration-300 hover:text-primary",
                            bookingsToDisplay === "upcoming" &&
                              "border-b border-primary  hover:text-current",
                          )}
                          onClick={() => setBookingsToDisplay("upcoming")}
                        >
                          Upcoming
                        </button>
                        <button
                          className={cn(
                            "border-b px-2 font-light transition-all duration-300 hover:text-primary",
                            bookingsToDisplay === "past" &&
                              "border-b border-primary  hover:text-current",
                          )}
                          onClick={() => setBookingsToDisplay("past")}
                        >
                          Previous
                        </button>
                      </>
                    )}
                  </div>
                </div>
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
                              <ProgressBar
                                start={booking.created}
                                end={booking.dateTo}
                              />
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
              </div>
            )}
            <div className="space-y-4 py-6 sm:py-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl">
                  {isMyProfile ? "Your Venues" : `${name}'s venues`}
                </h2>

                {isMyProfile && (
                  <Link
                    to={"/new-venue"}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "gap-1",
                    )}
                  >
                    Add new <FaPlus />
                  </Link>
                )}
              </div>
              <VenuesGrid>
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
              </VenuesGrid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUi;

function UserBio({ bio, isMyProfile, userName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [bioValue, setBioValue] = useState(bio);
  const { updateProfileMutation } = useUpdateUser({
    name: userName,
    onError: () => toast.error("Failed to update. Something went wrong"),
    onSuccess: () => toast.success("Update Successful"),
  });
  const handleEditBio = async () => {
    if (bioValue.trim() !== bio.trim())
      updateProfileMutation.mutate({
        name: userName,
        body: { bio: bioValue },
      });
    setIsEditing(false);
  };

  const handleBioChange = (e) => {
    if (e.currentTarget.value.length <= 160) {
      setBioValue(e.currentTarget.value);
    }
  };

  return (
    <section className="max-w-full space-y-2 py-6 sm:py-8">
      <div className="flex justify-between">
        <h2 className="font-semibold">Bio:</h2>
        {isMyProfile && !isEditing && (
          <Button
            variant="outline"
            className=""
            onClick={() => setIsEditing(true)}
          >
            <FaEdit />
          </Button>
        )}
      </div>
      <div className="mx-auto max-w-[80ch]">
        {!isEditing ? (
          <p className="mx-auto p-2">
            {bio ? (
              bio
            ) : (
              <span className="font-light text-muted-foreground">
                This user has no bio
              </span>
            )}
          </p>
        ) : (
          <>
            <textarea
              value={bioValue}
              className="w-full rounded-md p-2"
              onChange={handleBioChange}
            />

            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                className=" gap-1"
                onClick={handleEditBio}
              >
                Finish editing <FaCheck />
              </Button>
              <div className="text-right text-sm text-gray-500">
                {bioValue.length}/160
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
