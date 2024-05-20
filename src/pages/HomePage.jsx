import { useNavigate } from "react-router-dom";
import Search from "../components/ui/search";
import FiltersSection from "../components/Filters";
import Container from "../components/ui/container";

import { useEffect } from "react";

import { useBoundStore } from "../stores/store";
import { Dashboard } from "../components/Dashboard";
import { HeroSection } from "../components/HeroSection";
import { NewVenues } from "../components/Venues";

export default function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);

  const updatePageNumber = useBoundStore((state) => state.updatePageNumber);

  console.log("Rendered HomePage component");
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    updatePageNumber(1);
    navigate(`/venues?search=${searchTerm}`);
  };

  useEffect(() => {
    document.title = "Holiday Helper | Home";
  }, []);

  return (
    <Container>
      {!isLoggedIn ? <HeroSection /> : <Dashboard />}
      <div className="grid gap-8">
        <div className="flex justify-center">
          <Search onSearch={handleSearch} />{" "}
          <FiltersSection onSubmit={() => navigate("/venues")} />
        </div>
        <NewVenues />
      </div>
    </Container>
  );
}
