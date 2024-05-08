import useSearchVenues from "../hooks/useSearchVenues";
import useAllVenues from "../hooks/useAllVenues";
import Venues from "../components/Venues";
import { useSearchParams } from "react-router-dom";

export default function VenuesPage() {
  const [searchParams] = useSearchParams({ search: "" });
  const search = searchParams.get("search");
  const { data, error, status } = useSearchVenues(search);

  const {
    filteredData: allVenues,
    error: allError,
    status: allStatus,
  } = useAllVenues();

  if (!searchParams || !search) {
    return (
      <Venues
        venues={allVenues.data.data}
        error={allError}
        status={allStatus}
      />
    );
  }

  return <Venues venues={data.data.data} error={error} status={status} />;
}
