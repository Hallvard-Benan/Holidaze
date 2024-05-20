import SkeletonCard from "../Card/loading";

export default function SkeletonVenues() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 9 }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
