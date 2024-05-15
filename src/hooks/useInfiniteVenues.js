import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllVenues } from "../api/venues";
import { useBoundStore } from "../stores/store";
import { useEffect, useState } from "react";

export default function useInfiniteVenues() {
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const filters = useBoundStore((state) => state.filters);
  const perPage = useBoundStore((state) => state.paginationState.perPage);

  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["venues", filters],
      queryFn: ({ pageParam }) => fetchAllVenues({ pageParam, perPage }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.data.meta.nextPage,
    });

  //   useEffect(() => {
  //     if (data && filters && data.pages[currentPage]) {
  //       console.log(data.pages[currentPage]);
  //       const filteredVenues = filterVenues(
  //         data.pages[currentPage].data.data,
  //         filters,
  //       );
  //       setCurrentPage((prev) => prev + 1);
  //       setFilteredData((state) => [...state, ...filteredVenues]);
  //     }
  //   }, [data, filters, currentPage]);

  return {
    data,
    status,
    error,
    filteredData,
    fetchNextPage,
    isFetchingNextPage,
  };
}
