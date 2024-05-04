import useVenuesByProfile from "../hooks/useVenuesByProfile";
import Venues from "../components/Venues";
import { useParams } from "react-router-dom";

export default function UserVenuesPage() {
  const { userName } = useParams();
  const { data, error, status } = useVenuesByProfile(userName);

  return <Venues data={data} error={error} status={status} />;
}
