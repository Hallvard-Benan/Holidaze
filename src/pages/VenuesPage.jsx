import useSearchVenues from "../hooks/useSearchVenues";
import useAllVenues from "../hooks/useAllVenues";
import Venues from "../components/Venues";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Container from "../components/ui/container";
import FiltersSection from "../components/Filters";
import { ChosenFilters } from "../components/ChosenFilters";
import Search from "../components/ui/search";
import { useInView } from "react-intersection-observer";
import GridViewButtons from "../components/ui/grid-view-buttons";
import Spinner from "../components/ui/spinner";
import useInfiniteVenues from "../hooks/useInfiniteVenues";
import { useBoundStore } from "../stores/store";

export function SearchedVenues({ search }) {
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useSearchVenues(search);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (status === "pending") return <div>...loading</div>;
  if (status === "error") return <div>...error</div>;

  return (
    <div className="grid gap-2">
      {data.pages.map((page) => (
        <Venues
          key={page?.data.meta?.currentPage}
          meta={page?.data.meta}
          data={page.data.data}
          error={error}
          status={status}
        />
      ))}
      <div ref={ref}>
        {isFetchingNextPage && (
          <div className="p-8">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export function FilteredVenues() {
  const { ref, inView } = useInView();
  const filters = useBoundStore((state) => state.filters);
  const {
    data,
    error,
    status,
    meta,
    filteredData,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteVenues();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (status === "pending") return <div>...loading</div>;
  if (status === "error") return <div>...error</div>;
  return (
    <div className="grid gap-2">
      {data.pages.map((page) => {
        const filteredData = filterVenues(page.data.data, filters);
        console.log(filteredData);
        return (
          <Venues
            key={page.data.meta.currentPage}
            data={filteredData}
            error={error}
            status={status}
            meta={page.data.meta}
          />
        );
      })}
      <div ref={ref}>
        {isFetchingNextPage && (
          <div className="p-8">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default function VenuesPage() {
  const [searchParams] = useSearchParams({ search: "" });
  const search = searchParams.get("search");
  const filters = useBoundStore((state) => state.filters);
  const hasBeenFiltered =
    filters.maxGuests > 1 ||
    filters.maxPrice < 10000 ||
    filters.minPrice > 1 ||
    filters.pets ||
    filters.parking ||
    filters.wifi ||
    filters.breakfast ||
    filters.dateFrom ||
    filters.dateTo;

  useEffect(() => {
    document.title = "Holiday Helper | venues";
  }, []);

  if (!search) {
    return (
      <Container>
        <div className="max-w-full sm:hidden">
          <Search />
        </div>
        <div className="flex w-full items-center justify-between gap-2 overflow-hidden">
          <GridViewButtons />
          <div className="hidden w-full sm:flex">
            <Search />
          </div>
          <FiltersSection />
        </div>
        <FilteredVenues />
      </Container>
    );
  }

  return (
    <Container>
      <Link to={"/venues"}> clear</Link>
      <SearchedVenues search={search} />{" "}
    </Container>
  );
}

function filterVenues(data, filters) {
  const filteredVenues = data.filter((item) => {
    const priceInRange =
      item.price <= filters.maxPrice && item.price >= filters.minPrice;
    const maxGuestsInRange = item.maxGuests >= filters.maxGuests;
    const petsMatch = !filters.pets || item.meta.pets === filters.pets;
    const wifiMatch = !filters.wifi || item.meta.wifi === filters.wifi;
    const parkingMatch =
      !filters.parking || item.meta.parking === filters.parking;
    const breakfastMatch =
      !filters.breakfast || item.meta.breakfast === filters.breakfast;

    return (
      priceInRange &&
      maxGuestsInRange &&
      petsMatch &&
      wifiMatch &&
      parkingMatch &&
      breakfastMatch
    );
  });

  return filteredVenues;
}
