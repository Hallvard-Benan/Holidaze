import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Search from "../components/ui/search";
import Spinner from "../components/ui/spinner";
import useAllVenues from "../hooks/useAllVenues";
import Filters from "../components/ui/filters";

export default function HomePage() {
  const navigate = useNavigate();
  const { data, status, error } = useAllVenues();
  if (status === "pending") return <Spinner />;

  if (status === "error")
    return (
      <div>
        {error.message} {error.response.data.errors[0].message}
      </div>
    );
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    navigate(`/venues?search=${searchTerm}`);
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <div>
        <Filters />
      </div>

      <div className="mx-auto grid w-calc grid-cols-2 gap-3 md:grid-cols-3">
        {data.data.data.map((item) => (
          <Card
            rating={item.rating}
            location={item.location.city + ", " + item.location.country}
            key={item.id}
            heading={item.name}
            description={item.description}
            imgUrl={item.media[0]?.url}
            alt={item.media[0]?.alt}
            href={`/venues/${item.id}`}
          />
        ))}
      </div>
    </>
  );
}
