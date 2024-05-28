import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllVenues } from "../api/venues";
import { useBoundStore } from "../stores/store";
import { useState } from "react";

export default function useInfiniteVenues() {
  const [isLastPage, setIsLastPage] = useState(false);
  const filters = useBoundStore((state) => state.filters);

  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["venues", filters],
      queryFn: ({ pageParam }) => fetchAllVenues({ pageParam, perPage: 100 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.data.meta.nextPage,
    });

  const fetchNext = async () => {
    if (isLastPage) return;

    const lastPage = data.pages[0].data.meta.pageCount;

    const res = await fetchNextPage();
    if (res.data.pages.length === lastPage) setIsLastPage(true);
  };

  return {
    data,
    status,
    error,
    fetchNext,
    fetchNextPage,
    isFetchingNextPage,
  };
}
