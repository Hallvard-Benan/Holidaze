import useVenuesByProfile from "../hooks/useVenuesByProfile";
import Venues from "../components/Venues";
import { useParams } from "react-router-dom";
import Container from "../components/ui/container";
import { useEffect } from "react";

export default function UserVenuesPage() {
  const { userName } = useParams();
  const { data, error, status } = useVenuesByProfile(userName);
  useEffect(() => {
    document.title = `Holiday Helper | ${userName}'s venues`;
  }, [userName]);

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
