import SkeletonCard from "../Card/loading";
import { VenuesGrid } from "./ui";

export default function SkeletonVenues() {
  return (
    <VenuesGrid>
      {Array.from({ length: 9 }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </VenuesGrid>
  );
}
