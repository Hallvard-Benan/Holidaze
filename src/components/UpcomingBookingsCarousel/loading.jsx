import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function UpcomingBookingSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Skeleton className="w-full text-xl text-transparent">f</Skeleton>
      <Skeleton className="aspect-video w-full" />
    </div>
  );
}
