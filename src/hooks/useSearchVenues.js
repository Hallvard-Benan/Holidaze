import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
// import { searchVenues } from "../api/venues";
import { useInfiniteQuery } from "@tanstack/react-query";
export default function useSearchVenues(search) {
  async function doSearch({ pageParam, search }) {
    console.log(search, pageParam);
    const res = await axios.get(
      `${baseUrl}/holidaze/venues/search?q=${search}&limit=20&page=${pageParam}`,
    );
    return res;
  }

  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["search", search],
      queryFn: ({ pageParam }) => doSearch({ pageParam, search }),
      enabled: !!doSearch,
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.data.meta ? lastPage.data.meta.nextPage : 2,
    });

  return { data, status, error, fetchNextPage, isFetchingNextPage };
}
