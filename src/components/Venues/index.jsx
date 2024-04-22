import Card from "../Card";
import Spinner from "../ui/spinner";
export default function Venues({ data, error, status }) {
  if (status === "pending") return <Spinner />;
  if (status === "error") {
    return (
      <div>
        {error.message} {error.response.data.errors[0].message}
      </div>
    );
  }
  if (status === "success") {
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
}
