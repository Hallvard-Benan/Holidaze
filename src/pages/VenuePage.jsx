import { Link, useLoaderData } from "react-router-dom";
import useSingleVenue from "../hooks/useSingleVenue";
import { FaRegStar } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { useBoundStore } from "../stores/store";

import BookingForm from "../components/Forms/BookingForm";
import { Button } from "../components/ui/button";
import { cn } from "../utils/utils";

import useDeleteVenue from "../hooks/useDeleteVenue";
import { useEffect, useState } from "react";
import CreateVenueForm from "../components/Forms/CreateVenueForm";
import useUpdateVenue from "../hooks/useUpdateVenue";
import { ImageCarousel } from "../components/ui/imageCarousel";
import AmenityIcons from "../components/ui/amenetiesIcons";
import AreYouSure from "../components/ui/areYouSure";

import Container from "../components/ui/container";
import BookingsModal from "../components/ui/bookinigModal";
import { Skeleton } from "../components/ui/skeleton";
import LocationMap from "../components/Map";
import { useInView } from "react-intersection-observer";

export async function loader({ params }) {
  const id = params.venueId;
  return { id };
}

export default function VenuePage() {
  const user = useBoundStore((state) => state.user);
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);
  // Important to stop overflow issues caused by google maps
  const { ref: mapRef, inView } = useInView();
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

  if (status === "pending")
    return (
      <div className="space-y-4">
        <Skeleton className="aspect-video w-full sm:mx-auto sm:max-h-72 sm:w-auto" />
        <div className="hidden w-calc justify-between sm:flex ">
          <Skeleton className="mx-auto hidden h-4 w-8 sm:block" />
          <Skeleton className="mx-auto hidden h-4 w-8 sm:block" />
          <Skeleton className="mx-auto hidden h-4 w-8 sm:block" />
        </div>
        <div className="mx-auto w-calc space-y-4">
          <Skeleton className=" h-8 w-96 " />
          <Skeleton className=" h-4 w-72" />
          <Skeleton className=" h-4 w-72" />
        </div>
        <Skeleton className="mx-auto aspect-square w-calc" />
      </div>
    );

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
              <BookingsModal bookings={post.bookings} />
            )}
          </div>

          <AreYouSure
            buttonText="Delete this venue"
            title="Permanently delete this venue?"
            description="This action cannot be undone. This will permanently delete this venue."
            onConfirm={handleDelete}
            confirmText={"Delete"}
            className="bg-destructive"
            status={deleteMutation.status}
          />
        </div>
      )}

      <div className="grid gap-8">
        <div className="flex justify-center md:mx-auto md:w-calc">
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
          <div className="break-word flex flex-col gap-2 overflow-hidden">
            <h1 className=" text-2xl md:text-3xl">{post.name}</h1>
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
              <div className="space-y-2">
                <h3 className="break-word max-w-[200px] text-lg font-medium capitalize">
                  {" "}
                  {post.owner.name} is Hosting
                </h3>
                <Link
                  to={isLoggedIn ? `/profiles/${post.owner.name}` : ""}
                  className={cn(
                    !isLoggedIn && "hover:pointer pointer-events-none",
                    "mx-auto grid aspect-square h-[200px] gap-2 rounded-md border p-6",
                  )}
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
              </div>
              <div className="flex-grow space-y-8 divide-y">
                <div className="pt-8 md:pt-0">
                  <AmenityIcons meta={post.meta} maxGuests={post.maxGuests} />
                </div>
                <div
                  className={cn(
                    " grid max-w-full gap-2 overflow-hidden rounded-md p-2",
                  )}
                >
                  <h2 className="text-lg font-medium">About This Venue</h2>{" "}
                  <p className="break-word max-w-full ">{post.description}</p>
                </div>

                <div className="space-y-4 py-4">
                  <h3 className="break-word max-w-[200px] text-lg font-medium capitalize">
                    Area
                  </h3>

                  <div>
                    {" "}
                    {post.location.city && post.location.country && (
                      <p className="text-muted-foreground">
                        {post.location.city}, {post.location.country}
                      </p>
                    )}
                  </div>
                  <div
                    ref={mapRef}
                    className={cn(
                      "  aspect-video w-1  max-w-full overflow-hidden rounded-lg",
                      inView && "w-full",
                    )}
                  >
                    <LocationMap venue={post} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </div>
  );
}
