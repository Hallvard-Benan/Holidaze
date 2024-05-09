import { useNavigate } from "react-router-dom";
import Search from "../components/ui/search";
import useAllVenues from "../hooks/useAllVenues";
import FiltersSection from "../components/Filters";
import Container from "../components/ui/container";
import Venues from "../components/Venues";
import { ChosenFilters } from "../components/ChosenFilters";

export default function HomePage() {
  const navigate = useNavigate();
  const { status, error, filteredData } = useAllVenues();

  console.log("Rendered HomePage component");
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    navigate(`/venues?search=${searchTerm}`);
  };

  return (
    <Container>
      <img
        src="https://img.freepik.com/free-photo/summer-vacation-nature-tropical-summer-beach-ai-generated-image_587448-1490.jpg?t=st=1715282819~exp=1715286419~hmac=94cf2ac92fede1e70fa582b9b33aeedfaedfa5e913334a15750aa9c478e04653&w=2000"
        alt=""
        className="absolute right-0 top-0 -z-10 h-[580px] w-screen object-cover"
      />
      <div className="relative grid h-[350px] gap-4 py-6 text-center">
        <h1 className=" text-balance text-5xl font-bold leading-relaxed">
          Welcome to your travel site Discover your journey today
        </h1>
        <p className="text-muted-foreground">
          {" "}
          This is your moment to shine hehe
        </p>
      </div>
      <div className="flex justify-center">
        <Search onSearch={handleSearch} />
      </div>
      <div className="grid gap-2">
        <div className="flex justify-between">
          <ChosenFilters />
          <FiltersSection />
        </div>
        <Venues venues={filteredData} status={status} error={error} />
      </div>
    </Container>
  );
}
