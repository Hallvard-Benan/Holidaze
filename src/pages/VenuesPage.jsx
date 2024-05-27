import {
  FilteredVenues,
  PaginatedVenues,
  SearchedVenues,
} from "../components/Venues";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Container from "../components/ui/container";
import FiltersSection from "../components/Filters";
import Search from "../components/ui/search";
import { useBoundStore } from "../stores/store";

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

  if (!hasBeenFiltered && !search)
    return (
      <Container>
        <div className="flex max-w-full items-center pt-4 ">
          <Search />
          <FiltersSection variant={"small"} />
        </div>

        <PaginatedVenues />
      </Container>
    );

  if (!search) {
    return (
      <Container>
        <div className="flex max-w-full items-center pt-4">
          <Search />
          <FiltersSection variant={"small"} />
        </div>
        <FilteredVenues />
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex max-w-full items-center pt-4">
        <Search />
        <div className="h-full">
          <FiltersSection variant={"small"} />
        </div>
      </div>
      <SearchedVenues search={search} />
    </Container>
  );
}
