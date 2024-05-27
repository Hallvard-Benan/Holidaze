import useVenuesByProfile from "../hooks/useVenuesByProfile";
import Venues, { MyVenues } from "../components/Venues";
import { useParams } from "react-router-dom";
import Container from "../components/ui/container";
import { useEffect } from "react";
import SkeletonVenues from "../components/Venues/loading";
import { useBoundStore } from "../stores/store";
import { VenuesGrid } from "../components/Venues/ui";

export default function UserVenuesPage() {
  const { userName } = useParams();
  const myUser = useBoundStore((state) => state.user.name);
  const { data, error, status } = useVenuesByProfile(userName);
  useEffect(() => {
    document.title = `Holiday Helper | ${userName}'s venues`;
  }, [userName]);

  const isMyUser = myUser === userName;

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
      <div className="flex justify-between">
        {isMyUser && <h1 className="text-3xl font-semibold">Your Venues</h1>}
      </div>
      <VenuesGrid>
        {isMyUser ? (
          <MyVenues data={data?.data?.data} />
        ) : (
          <Venues data={data.data.data} />
        )}
      </VenuesGrid>
    </Container>
  );
}
