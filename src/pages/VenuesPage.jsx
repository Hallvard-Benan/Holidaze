import useSearchVenues from "../hooks/useSearchVenues";
import useAllVenues from "../hooks/useAllVenues";
import Venues from "../components/Venues";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useEffect } from "react";

export function SearchedVenues({ search }) {
  const { data, error, status } = useSearchVenues(search);
  return <Venues venues={data?.data.data} error={error} status={status} />;
}

export function FilteredVenues() {
  const {
    filteredData: allVenues,
    error: allError,
    status: allStatus,
  } = useAllVenues();

  return <Venues venues={allVenues} error={allError} status={allStatus} />;
}

export default function VenuesPage() {
  const [searchParams] = useSearchParams({ search: "" });
  const search = searchParams.get("search");

  useEffect(() => {}, [searchParams]);

  if (!search) {
    return <FilteredVenues />;
  }

  return (
    <>
      <Link to={"/venues"}> clear</Link>
      <SearchedVenues search={search} />{" "}
    </>
  );
}
