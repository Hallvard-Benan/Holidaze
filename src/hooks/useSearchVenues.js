import { searchVenues } from "../api/venues";
import { useInfiniteQuery } from "@tanstack/react-query";
export default function useSearchVenues(search) {
  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["search", search],
      queryFn: ({ pageParam }) => searchVenues({ pageParam, search }),
      enabled: !!searchVenues,
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.data.meta ? lastPage.data.meta.nextPage : 2,
    });

  return { data, status, error, fetchNextPage, isFetchingNextPage };
}
