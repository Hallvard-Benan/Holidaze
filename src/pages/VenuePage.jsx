import { useQuery } from "@tanstack/react-query";
import { fetchVenueById } from "../api";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const id = params.venueId;
  return { id };
}

export default function VenuePage() {
  const { id } = useLoaderData();
  const { data, status, error } = useQuery({
    queryKey: ["venue", id],
    queryFn: () => fetchVenueById(id),
  });

  if (status === "pending") return <div>...loading</div>;

  if (status === "error")
    return (
      <div>
        {error.message} {error.response.data.errors[0].message}
      </div>
    );
  const post = data.data.data;
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
    </div>
  );
}
