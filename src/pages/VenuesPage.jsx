import useSearchVenues from "../hooks/useSearchVenues";
import useAllVenues from "../hooks/useAllVenues";
import Venues from "../components/Venues";
import { useSearchParams } from "react-router-dom";

export default function VenuesPage() {
  const [searchParams] = useSearchParams({ search: "" });
  const search = searchParams.get("search");

  const { data, error, status } = useSearchVenues(search);
  const {
    data: allVenues,
    error: allError,
    status: allStatus,
  } = useAllVenues();

  // Check if there are no search parameters, then use data from useAllVenues
  if (!searchParams || !search) {
    return <Venues data={allVenues} error={allError} status={allStatus} />;
  }

  // Handle the case when there are search parameters
  return <Venues data={data} error={error} status={status} />;
}
