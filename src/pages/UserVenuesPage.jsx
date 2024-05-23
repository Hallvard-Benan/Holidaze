import useVenuesByProfile from "../hooks/useVenuesByProfile";
import Venues from "../components/Venues";
import { useParams } from "react-router-dom";
import Container from "../components/ui/container";
import { useEffect } from "react";
import SkeletonVenues from "../components/Venues/loading";

export default function UserVenuesPage() {
  const { userName } = useParams();
  const { data, error, status } = useVenuesByProfile(userName);
  useEffect(() => {
    document.title = `Holiday Helper | ${userName}'s venues`;
  }, [userName]);

  if (status === "pending") return <SkeletonVenues />;
  if (status === "error") {
    return (
      <div>
        {error.message} {error.response.data.errors[0].message}
      </div>
    );
  }

  return (
    <Container>
      <h1 className="text-xl">{userName}'s Venues</h1>
      <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        <Venues data={data?.data?.data} />
      </div>
    </Container>
  );
}
