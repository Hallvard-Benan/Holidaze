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
import { Separator } from "@radix-ui/react-separator";

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
    <Container className={"gap-16 py-4"}>
      {!isLoggedIn ? (
        <div className="relative grid gap-4 py-6 text-center">
          <h1 className="text-balance text-3xl font-extrabold leading-relaxed sm:text-5xl sm:leading-relaxed">
            Find your Destination <br /> Host travelers
          </h1>
        </div>
      ) : (
        <div className="grid gap-8">
          <h2>Welcome, {userName}!</h2>
          <div className="relative flex w-full max-w-full flex-col gap-16 overflow-hidden md:flex-row">
            {bookingsNumber && bookingsNumber > 0 ? (
              <Suspense fallback={<div>Loading...</div>}>
                <UpComingBookings />
              </Suspense>
            ) : (
              <></>
            )}
            <Separator
              orientation="vertical"
              className=" absolute  left-1/2 hidden h-full w-[1px] -translate-x-1/2  bg-[#E8E8E8] md:block"
            />
            {venuesNumber > 0 && (
              <div className="w-full">
                <YourVenuesDashboard userName={userName} />
              </div>
            )}
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className="flex justify-center gap-2">
          <p className="text-muted-foreground">
            This is your moment to shine hehe
          </p>
          <Button>Register</Button>
          <Button variant="outline">Log In</Button>
        </div>
      )}
      <div className="grid gap-8">
        <div className="flex justify-center">
          <Search onSearch={handleSearch} /> <FiltersSection />
        </div>
        <FilteredVenues />
      </div>
    </Container>
  );
}
