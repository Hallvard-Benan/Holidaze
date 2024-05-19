import { Skeleton } from "../ui/skeleton";

export default function VenuesDashboardSkeleton() {
  return (
    <div className="grid h-full w-full grid-rows-[auto,1fr,auto]  gap-8 ">
      <Skeleton className={" w-full text-xl text-transparent"}>asdf</Skeleton>
      <div className="flex gap-8">
        <Skeleton className={"h-full w-full"}></Skeleton>
        <Skeleton className={"h-full w-full"}></Skeleton>
      </div>

      <Skeleton className=" h-14 rounded-xl "></Skeleton>
    </div>
  );
}
