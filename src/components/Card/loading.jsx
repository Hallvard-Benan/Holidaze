import { Skeleton } from "../ui/skeleton";

export default function SkeletonCard() {
  return (
    <Skeleton className="group grid h-[450px] grid-rows-[300px,auto] overflow-hidden rounded-lg border border-gray-200 shadow"></Skeleton>
  );
}
