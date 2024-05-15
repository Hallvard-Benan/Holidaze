import { useNavigate } from "react-router-dom";
import Search from "../components/ui/search";
import FiltersSection from "../components/Filters";
import Container from "../components/ui/container";

import { lazy, Suspense, useEffect } from "react";
import { ChosenFilters } from "../components/ChosenFilters";
import { Button } from "../components/ui/button";
import { useBoundStore } from "../stores/store";
import YourVenuesDashboard from "../components/YourVenuesDashboard";
import { FilteredVenues } from "./VenuesPage";

const UpComingBookings = lazy(
  () => import("../components/UpcomingBookingsCarousel"),
);

export default function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);
  const userName = useBoundStore((state) => state.user.name);
  const bookingsNumber = useBoundStore((state) => state.user?._count?.bookings);
  const venuesNumber = useBoundStore((state) => state.user?._count?.venues);
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
      {!isLoggedIn ? (
        <div className="relative grid gap-4 py-6 text-center">
          <h1 className="text-balance text-3xl font-extrabold leading-relaxed sm:text-5xl sm:leading-relaxed">
            Find your Destination <br /> Host travelers
          </h1>
        </div>
      ) : (
        <>
          <h2>Welcome, {userName} </h2>
          {bookingsNumber && bookingsNumber > 0 ? (
            <Suspense fallback={<div>Loading...</div>}>
              <UpComingBookings />
            </Suspense>
          ) : (
            <></>
          )}

          {venuesNumber > 0 && (
            <div>
              <YourVenuesDashboard userName={userName} />
            </div>
          )}
        </>
      )}

      <div className="flex justify-center">
        <Search onSearch={handleSearch} /> <FiltersSection />
      </div>
      {!isLoggedIn && (
        <div className="flex justify-center gap-2">
          <p className="text-muted-foreground">
            This is your moment to shine hehe
          </p>
          <Button>Register</Button>
          <Button variant="outline">Log In</Button>
        </div>
      )}
      <div className="grid gap-2">
        <FilteredVenues />
      </div>
    </Container>
  );
}
