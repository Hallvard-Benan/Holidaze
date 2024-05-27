import { Link, useLoaderData } from "react-router-dom";
import useSingleVenue from "../hooks/useSingleVenue";
import { FaRegStar } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Spinner from "../components/ui/spinner";

import { useBoundStore } from "../stores/store";

import BookingForm from "../components/Forms/BookingForm";
import { Button } from "../components/ui/button";
import { cn, formatDate } from "../utils/utils";

import useDeleteVenue from "../hooks/useDeleteVenue";
import { useEffect, useState } from "react";
import CreateVenueForm from "../components/Forms/CreateVenueForm";
import useUpdateVenue from "../hooks/useUpdateVenue";
import { ImageCarousel } from "../components/ui/imageCarousel";
import AmenityIcons from "../components/ui/amenetiesIcons";
import { Separator } from "../components/ui/seperator";
import AreYouSure from "../components/ui/areYouSure";
import { CiCircleList } from "react-icons/ci";

import {
  DialogHeader,
  DialogTrigger,
  Dialog,
  DialogContent,
} from "../components/ui/dialog";
import Container from "../components/ui/container";

export async function loader({ params }) {
  const id = params.venueId;
  return { id };
}

export default function VenuePage() {
  const user = useBoundStore((state) => state.user);
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);

  const editVenueFormData = useBoundStore((state) => state.editVenueFormData);
  const updateEditItem = useBoundStore((state) => state.updateEditItem);
  const updateEditMeta = useBoundStore((state) => state.updateEditMeta);
  const updateEditLocation = useBoundStore((state) => state.updateEditLocation);
  const updateEditVenueForm = useBoundStore(
    (state) => state.updateEditVenueForm,
  );
  const decreaseEditItem = useBoundStore((state) => state.decreaseEditItem);
  const increaseEditItem = useBoundStore((state) => state.increaseEditItem);
  const { deleteMutation } = useDeleteVenue();
  const { id } = useLoaderData();
  const {
    updateVenueMutation,
    error: updateError,
    setError: setUpdateError,
  } = useUpdateVenue({
    id,
    onUpdateSuccess,
    setError,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [fullDescription, setFullDescription] = useState(false);

  const { data, status, error } = useSingleVenue(id);

  useEffect(() => {
    if (data) document.title = data.data.data.name;
  }, [data]);

  useEffect(() => {
    if (data) {
      updateEditVenueForm({
        name: data.data.data.name,
        description: data.data.data.description,
        media: data.data.data.media,
        price: data.data.data.price,
        maxGuests: data.data.data.maxGuests,
        rating: data.data.data.rating,
        meta: data.data.data.meta,
        location: data.data.data.location,
      });
    }
  }, [data]);

  if (status === "pending") return <Spinner />;

  if (status === "error")
    return (
      <div>
        {error.message} {error.response.data.errors[0].message}
      </div>
    );

  const post = data.data.data;
  let disabledDates = [];
  const isMyVenue = post.owner && post.owner.name === user.name;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates only

  // Loop through each booking
  post.bookings.forEach((booking) => {
    // Parse the dateFrom and dateTo strings to Date objects
    const fromDate = new Date(booking.dateFrom);
    const toDate = new Date(booking.dateTo);

    // Loop through dates within the range and add them to the disabledDates array
    for (
      let date = fromDate;
      date <= toDate;
      date.setDate(date.getDate() + 1)
    ) {
      // Add all dates, including those before today
      disabledDates.push(new Date(date)); // Store a new Date object to avoid reference sharing
    }
  });

  // Convert disabledDates to an array of strings in "YYYY-MM-DD" format
  disabledDates = disabledDates.map((date) => date.toISOString().split("T")[0]);

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    updateVenueMutation.mutate({ id: post.id, body: editVenueFormData });
  };

  function onUpdateSuccess() {
    setIsUpdating(false);
    window.location.reload();
  }
  function setError(error) {
    setUpdateError(error);
  }

  return (
    <div className="">
      {isMyVenue && (
        <div
          className={cn(
            "mx-auto flex w-calc flex-col justify-between gap-8  px-2 py-4 sm:flex-row",
          )}
        >
          <div className={"relative flex w-full flex-col gap-4 sm:flex-row"}>
            <Button
              variant="outline"
              className={"gap-2"}
              onClick={() => setIsUpdating((prev) => !prev)}
            >
              Update <FaEdit />
            </Button>

            {isUpdating && (
              <CreateVenueForm
                handleBack={() => setIsUpdating(false)}
                status={status}
                errors={updateError?.response?.data?.errors}
                onSubmit={handleEdit}
                setError={setUpdateError}
                updateItem={updateEditItem}
                updateMeta={updateEditMeta}
                updateLocation={updateEditLocation}
                updateVenueForm={updateEditVenueForm}
                venueFormData={editVenueFormData}
                decreaseItem={decreaseEditItem}
                increaseItem={increaseEditItem}
              />
            )}

            {post.bookings.length > 0 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="relative gap-2">
                    See Bookings <CiCircleList size={"20px"} />{" "}
                    <span className="absolute -right-0 top-0 flex size-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border bg-primary text-primary-foreground">
                      {post.bookings.length}
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[95dvh] overflow-y-auto px-0">
                  <DialogHeader className={"text-center"}>
                    <h2 className="text-center text-xl">Bookings</h2>
                  </DialogHeader>
                  <div className="grid max-h-full divide-y overflow-y-auto ">
                    {" "}
                    {post.bookings.map((booking) => (
                      <div
                        className="grid w-full grid-cols-3 gap-4 bg-card py-4 md:p-6"
                        key={booking.id}
                      >
                        <Link
                          to={`/profiles/${booking.customer.name}`}
                          className="flex flex-col items-center gap-2 sm:text-lg"
                        >
                          <h3>{booking.customer.name}</h3>
                          <img
                            src={booking.customer.avatar.url}
                            alt={`${booking.customer.name}'s avatar`}
                            className="size-10 rounded-full object-cover"
                          />
                        </Link>
                        <p>
                          <p className="text-sm md:text-base">Check in:</p>{" "}
                          {formatDate(booking.dateFrom)}
                        </p>
                        <p>
                          <p className="text-sm md:text-base">Check out</p>{" "}
                          {formatDate(booking.dateTo)}
                        </p>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <AreYouSure
            buttonText="Delete this venue"
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete this venue."
            onConfirm={handleDelete}
            className="bg-destructive"
            status={deleteMutation.status}
          />
        </div>
      )}

      <div className="grid gap-8">
        <div className="flex justify-center">
          <ImageCarousel
            noImage={post.media.length < 1}
            images={
              post.media.length > 0
                ? post.media
                : [
                    {
                      url: "/noimage.png",
                    },
                  ]
            }
          />
        </div>
        <Container>
          <div className="flex flex-col gap-2 overflow-hidden break-all">
            <h1 className="text-2xl md:text-3xl">{post.name}</h1>
            {post.location.city && post.location.country && (
              <p className="text-muted-foreground">
                {post.location.city}, {post.location.country}
              </p>
            )}
          </div>
          <div className="flex justify-between">
            <p className="text-2xl font-semibold">
              {post.price} kr /{" "}
              <span className="font-normal text-muted-foreground">night</span>
            </p>
            <p className="flex items-center gap-2">
              <FaRegStar /> {post.rating}
            </p>
          </div>
          <div className="border-b pb-4">
            <BookingForm
              post={post}
              status={status}
              disabled={isMyVenue}
              disabledDates={disabledDates}
              price={post.price}
              name={user.name}
              venueId={id}
              maxGuests={post.maxGuests}
            />
          </div>

          <section className="flex flex-col items-center gap-6 pb-8 ">
            <div className="flex w-full flex-col gap-8 divide-y sm:flex-row sm:divide-y-0">
              <Link
                to={`/profiles/${post.owner.name}`}
                className={
                  (cn(!isLoggedIn && "pointer-events-none"),
                  "mx-auto grid aspect-square h-[200px] gap-2 rounded-md border p-6")
                }
              >
                <div className=" flex flex-col items-center justify-center gap-2">
                  <img
                    src={post.owner.avatar.url}
                    alt=""
                    className={"h-20 w-20 rounded-full object-cover"}
                  />{" "}
                  <p className="text-xl font-medium">{post.owner.name}</p>{" "}
                  <p className=" text-2xl text-primary">
                    <MdVerifiedUser />
                  </p>
                </div>
              </Link>
              <div className="flex-grow space-y-8 divide-y">
                <div className="pt-8 md:pt-0">
                  <AmenityIcons meta={post.meta} maxGuests={post.maxGuests} />
                </div>
                <div
                  className={cn(
                    " grid max-w-full gap-2 overflow-hidden rounded-md p-2",
                  )}
                >
                  <h2 className="text-lg font-medium">About This Venue</h2>
                  <p className="max-w-full break-all ">{post.description}</p>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </div>
  );
}
