import { useNavigate } from "react-router-dom";
import Search from "../components/ui/search";
import useAllVenues from "../hooks/useAllVenues";
import FiltersSection from "../components/Filters";
import Container from "../components/ui/container";
import Venues from "../components/Venues";

export default function HomePage() {
  const navigate = useNavigate();
  const { status, error, filteredData } = useAllVenues();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    navigate(`/venues?search=${searchTerm}`);
  };

  return (
    <Container>
      <div className="flex justify-between">
        <Search onSearch={handleSearch} />
        <FiltersSection />
      </div>

      <Venues venues={filteredData} status={status} error={error} />
    </Container>
  );
}
