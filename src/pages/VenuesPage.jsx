import useSearchVenues from "../hooks/useSearchVenues";
import useAllVenues from "../hooks/useAllVenues";
import Venues from "../components/Venues";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Container from "../components/ui/container";
import FiltersSection from "../components/Filters";
import { ChosenFilters } from "../components/ChosenFilters";
import Search from "../components/ui/search";

export function SearchedVenues({ search }) {
  const { data, error, status } = useSearchVenues(search);
  return (
    <Venues
      meta={data?.data.meta}
      data={data?.data.data}
      error={error}
      status={status}
    />
  );
}

export function FilteredVenues() {
  const {
    filteredData: allVenues,
    error: allError,
    status: allStatus,
    meta,
  } = useAllVenues();

  return (
    <Venues meta={meta} data={allVenues} error={allError} status={allStatus} />
  );
}

export default function VenuesPage() {
  const [searchParams] = useSearchParams({ search: "" });
  const search = searchParams.get("search");

  useEffect(() => {}, [searchParams]);

  if (!search) {
    return (
      <Container>
        <Search />
        <div className="flex justify-between">
          <ChosenFilters />
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
