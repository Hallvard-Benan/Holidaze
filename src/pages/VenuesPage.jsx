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

  if (!searchParams || !search) {
    return <Venues data={allVenues} error={allError} status={allStatus} />;
  }

  return <Venues data={data} error={error} status={status} />;
}
