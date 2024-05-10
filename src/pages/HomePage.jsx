import { useNavigate } from "react-router-dom";
import Search from "../components/ui/search";
import useAllVenues from "../hooks/useAllVenues";
import FiltersSection from "../components/Filters";
import Container from "../components/ui/container";
import Venues from "../components/Venues";
import { ChosenFilters } from "../components/ChosenFilters";
import { Button } from "../components/ui/button";

export default function HomePage() {
  const navigate = useNavigate();
  const { status, error, filteredData, fakeVenues } = useAllVenues();

  console.log("Rendered HomePage component");
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    navigate(`/venues?search=${searchTerm}`);
  };

  return (
    <Container>
      <div className="relative grid  gap-4 py-6 text-center">
        <h1 className=" text-balance text-3xl font-extrabold leading-relaxed sm:text-5xl sm:leading-relaxed">
          Find your Destination <br /> Host travelers
        </h1>
      </div>
      <div className="flex flex-wrap justify-center">
        <Search onSearch={handleSearch} />
        <FiltersSection />
      </div>
      <div className="flex justify-center gap-2">
        <p className="text-muted-foreground">
          {" "}
          This is your moment to shine hehe
        </p>
        <Button>Register</Button>
        <Button variant="outline">Log In</Button>
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
