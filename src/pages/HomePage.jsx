import { useQuery } from "@tanstack/react-query";
import { fetchAllVenues } from "../api";
import { Link } from "react-router-dom";
import Card from "../components/Card";

export default function HomePage() {
  const { data, status, error } = useQuery({
    queryKey: ["venues"],
    queryFn: () => fetchAllVenues(),
  });

  if (status === "pending") return <div>...loading</div>;

  if (status === "error")
    return (
      <div>
        {" "}
        {error.message} {error.response.data.errors[0].message}
      </div>
    );

  return (
    <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
      {data.data.data.map((item) => (
        <Card
          key={item.id}
          heading={item.name}
          description={item.description}
          imgUrl={item.media[0]?.url}
          alt={item.media[0]?.alt}
          href={`/venues/${item.id}`}
        />
      ))}
    </div>
  );
}
