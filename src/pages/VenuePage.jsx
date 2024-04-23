import { useLoaderData } from "react-router-dom";
import useSingleVenue from "../hooks/useSingleVenue";
import Spinner from "../components/ui/spinner";

import BookingForm from "../components/Forms/BookingForm";

export async function loader({ params }) {
  const id = params.venueId;
  return { id };
}

export default function VenuePage() {
  const { id } = useLoaderData();
  const { data, status, error } = useSingleVenue(id);

  if (status === "pending") return <Spinner />;

  if (status === "error")
    return (
      <div>
        {error.message} {error.response.data.errors[0].message}
      </div>
    );
  const post = data.data.data;
  let disabledDates = [];

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

  return (
    <div className="container mx-auto">
      <h1>{post.name}</h1>
      <p>{post.description}</p>
      <p>price: {post.price} kr</p>
      <p>max guests: {post.maxGuests}</p>
      <p>rating: {post.rating}</p>
      <p>wifi: {post.wifi ? "yes" : "no"}</p>
      <p>pets: {post.pets ? "yes" : "no"}</p>
      <p>parking: {post.parking ? "yes" : "no"}</p>
      <p>breakfast: {post.breakfast ? "yes" : "no"}</p>
      <img src={post.media[0].url} alt="" className="w-96" />
      <BookingForm
        disabledDates={disabledDates}
        venueId={id}
        maxGuests={post.maxGuests}
      />
    </div>
  );
}
