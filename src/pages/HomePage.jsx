import { Link, useNavigate } from "react-router-dom";
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
  const clearFilters = useBoundStore((state) => state.clearFilters);
  const userName = useBoundStore((state) => state.user.name);
  const updatePageNumber = useBoundStore((state) => state.updatePageNumber);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    updatePageNumber(1);
    navigate(`/venues?search=${searchTerm}`);
  };

  useEffect(() => {
    document.title = "Holiday Helper | Home";
    clearFilters();
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <HeroSection />
      ) : (
        <Container className={"grid gap-4 sm:gap-8"}>
          <h2 className="pt-2">Welcome, {userName}!</h2>
          <Dashboard />
        </Container>
      )}
      <Container>
        <div className="grid gap-4 sm:gap-8">
          {isLoggedIn && (
            <div className="flex justify-center pt-8  ">
              <Search onSearch={handleSearch} />{" "}
              <FiltersSection
                onSubmit={() => navigate("/venues")}
                variant={"home"}
              />
            </div>
          )}
          <div className="grid gap-4">
            <div className="flex items-center justify-between pt-4">
              <h2 className="text-lg">Newest Venues:</h2>
              <Link to={"/venues"} className="hover:underline">
                see all
              </Link>
            </div>
            <NewVenues />
          </div>
        </div>
      </Container>
    </>
  );
}
