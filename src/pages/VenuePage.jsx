import { Link, useLoaderData } from "react-router-dom";
import useSingleVenue from "../hooks/useSingleVenue";
import { FaRegStar } from "react-icons/fa";

import Spinner from "../components/ui/spinner";

import { useBoundStore } from "../stores/store";

import BookingForm from "../components/Forms/BookingForm";
import { Button } from "../components/ui/button";
import { cn, formatDate } from "../utils/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import useDeleteVenue from "../hooks/useDeleteVenue";
import { useEffect, useState } from "react";
import CreateVenueForm from "../components/Forms/CreateVenueForm";
import useUpdateVenue from "../hooks/useUpdateVenue";
import { ImageCarousel } from "../components/ui/imageCarousel";
import AmenityIcons from "../components/ui/amenetiesIcons";
import { Separator } from "../components/ui/seperator";

export async function loader({ params }) {
  const id = params.venueId;
  return { id };
}

export default function VenuePage() {
  const user = useBoundStore((state) => state.user);
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);
  const updateVenueForm = useBoundStore((state) => state.updateVenueForm);
  const venueFormData = useBoundStore((state) => state.venueFormData);
  const { deleteMutation } = useDeleteVenue();
  const { id } = useLoaderData();
  const { updateVenueMutation } = useUpdateVenue({
    id,
    onUpdateSuccess,
    setError,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState([]);

  const { data, status, error } = useSingleVenue(id);

  useEffect(() => {
    if (data)
      updateVenueForm({
        name: data.data.data.name,
        description: data.data.data.description,
        media: data.data.data.media,
        price: data.data.data.price,
        maxGuests: data.data.data.maxGuests,
        rating: data.data.data.rating,
        meta: data.data.data.meta,
        location: data.data.data.location,
      });
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
  // Get today's date
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
    updateVenueMutation.mutate({ id: post.id, body: venueFormData });
  };

  function onUpdateSuccess() {
    setIsUpdating(false);
  }
  function setError(error) {
    setUpdateError(error);
  }

  console.log(post);

  return (
    <div className="mx-auto w-calc">
      {isMyVenue && (
        <>
          <Button onClick={() => setIsUpdating((prev) => !prev)}>Update</Button>
          {isUpdating && (
            <CreateVenueForm
              status={status}
              errors={updateError}
              defaultValues={venueFormData}
              onSubmit={handleEdit}
            />
          )}
          <AlertDialog>
            <AlertDialogTrigger variant="destructive">
              Delete this venue
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this venue
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  {deleteMutation.status === "pending" ? (
                    <Spinner></Spinner>
                  ) : (
                    "Continue"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          bookings:
          {post.bookings.map((booking) => (
            <div className="bg-card p-6" key={booking.id}>
              <Link
                to={`/profiles/${booking.customer.name}`}
                className="flex gap-2 text-lg"
              >
                <h3>{booking.customer.name}</h3>
                <img
                  src={booking.customer.avatar.url}
                  alt=""
                  className="h-10 rounded-full"
                />
              </Link>

              <p>
                Booked from {formatDate(booking.dateFrom)} to{" "}
                {formatDate(booking.dateTo)}
              </p>
            </div>
          ))}
        </>
      )}
      <div className="grid gap-6">
        <div className="flex justify-center">
          <ImageCarousel images={post.media} />
        </div>
        <div className="flex justify-between">
          <h1 className="text-2xl md:text-3xl">{post.name}</h1>
          <p className="text-2xl font-semibold">
            {post.price} kr /{" "}
            <span className="text-muted-foreground font-normal">night</span>
          </p>
        </div>
        <div className="flex justify-between">
          <AmenityIcons meta={post.meta} maxGuests={post.maxGuests} />{" "}
          <p className="flex items-center gap-2">
            <FaRegStar /> {post.rating}
          </p>
        </div>
        <BookingForm
          status={status}
          disabled={isMyVenue}
          disabledDates={disabledDates}
          price={post.price}
          venueId={id}
          maxGuests={post.maxGuests}
        />
        <Separator />

        <Link
          to={`/profiles/${post.owner.name}`}
          className={cn(!isLoggedIn && "pointer-events-none")}
        >
          {" "}
          <img
            src={post.owner.avatar.url}
            alt=""
            className={"h-10 w-10 rounded-full object-cover"}
          />{" "}
          {post.owner.name}
        </Link>

        <p className="bg-card rounded-sm p-4">
          <h2>Description</h2>
          {post.description}
        </p>
      </div>
    </div>
  );
}
