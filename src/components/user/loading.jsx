import SkeletonVenues from "../Venues/loading";
import { Skeleton } from "../ui/skeleton";
export default function SkeletonProfile() {
  return (
    <div className="relative mx-auto grid  w-calc gap-4 overflow-hidden">
      <div className="relative  h-48 w-full rounded-b-md object-cover sm:h-80">
        <Skeleton className="h-48 w-full rounded-b-md object-cover sm:h-80" />
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-full ">
          <Skeleton
            className={`size-24 rounded-full border border-white bg-white object-cover md:size-40 `}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center divide-y ">
        <Skeleton className=" my-6 w-fit self-center break-words text-center text-4xl  text-transparent sm:my-8 md:text-5xl">
          This is a username
        </Skeleton>
        <Skeleton className={"h-36 w-full"} />
      </div>
      <Skeleton className=" my-6 w-fit break-words text-center text-4xl  text-transparent sm:my-8 md:text-5xl">
        This is a username
      </Skeleton>
      <SkeletonVenues />
    </div>
  );
}
