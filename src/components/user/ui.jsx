import { Link } from "react-router-dom";
import { cn } from "../../utils/utils";

import UpdateAvatarForm from "../Forms/UpdateAvatarForm";
import { VenuesGrid } from "../Venues/ui";
import { useState } from "react";
import { FaCheck, FaEdit, FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Button, buttonVariants } from "../ui/button";
import useUpdateUser from "../../hooks/useUpdateUser";
import { toast } from "sonner";
import Bookings from "../Bookings";
import BookingsButtons from "../Bookings/buttons";
import useFilterBookings from "../../hooks/useFilterBookings";
import useVenuesByProfile from "../../hooks/useVenuesByProfile";
import Venues, { MyVenues } from "../Venues";
import Spinner from "../ui/spinner";
function ProfileUi({ name, avatar, banner, bio, bookings, isMyProfile }) {
  const { renderedBookings, setBookingsToDisplay, bookingsToDisplay } =
    useFilterBookings(bookings);
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
            <h1 className=" break-words py-6 text-center text-4xl  sm:py-8 md:text-5xl">
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
                      <BookingsButtons
                        bookingsToDisplay={bookingsToDisplay}
                        setBookingsToDisplay={setBookingsToDisplay}
                      />
                    )}
                  </div>
                </div>
                <Bookings
                  renderedBookings={renderedBookings}
                  bookingsToDisplay={bookingsToDisplay}
                />
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
                <ProfileVenues isMyProfile={isMyProfile} userName={name} />
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

function ProfileVenues({ userName, isMyProfile }) {
  const { data, error, status } = useVenuesByProfile(userName);
  if (status === "pending") return <Spinner />;

  if (status === "error") {
    return (
      <div>
        error {error.message}{" "}
        {error.response?.data?.errors.map((e, i) => (
          <p key={i}>{e.message}</p>
        ))}{" "}
      </div>
    );
  }

  if (status === "success") {
    const userData = data.data.data;
    if (isMyProfile) return <MyVenues data={userData}></MyVenues>;
    return <Venues data={userData}></Venues>;
  }
}
