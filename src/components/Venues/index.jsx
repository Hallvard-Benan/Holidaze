import Card from "../Card";
import Container from "../ui/container";
import Spinner from "../ui/spinner";
export default function Venues({ venues, error, status }) {
  if (status === "pending") return <Spinner />;
  if (status === "error") {
    return (
      <div>
        {error.message} {error.response.data.errors[0].message}
      </div>
    );
  }
  if (status === "success" && venues) {
    return (
      <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {venues.map((item) => (
          <Card
            key={item.id}
            heading={item.name}
            description={item.description}
            images={item.media}
            price={item.price}
            location={item.location}
            rating={item.rating}
            details={item.price}
            href={`/venues/${item.id}`}
          />
        ))}
      </div>
    );
  }
}
