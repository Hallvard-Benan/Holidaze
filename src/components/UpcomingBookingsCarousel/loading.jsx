import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function UpcomingBookingSkeleton() {
  return (
    <div className="flex w-full gap-4">
      <Skeleton className="aspect-video w-full" />
      <Skeleton className="hidden aspect-video w-full md:block" />
    </div>
  );
}
