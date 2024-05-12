import useVenuesByProfile from "../hooks/useVenuesByProfile";
import Venues from "../components/Venues";
import { useParams } from "react-router-dom";
import Container from "../components/ui/container";

export default function UserVenuesPage() {
  const { userName } = useParams();
  const { data, error, status } = useVenuesByProfile(userName);

  return (
    <Container>
      <Venues
        data={data?.data?.data}
        meta={data?.data.meta}
        error={error}
        status={status}
      />
    </Container>
  );
}
