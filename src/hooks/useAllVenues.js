import { useQuery } from "@tanstack/react-query";
import { fetchAllVenues } from "../api/venues";
import { useBoundStore } from "../stores/store";
import { useEffect, useState } from "react";

export default function useAllVenues() {
  const [filteredData, setFilteredData] = useState();
  const [meta, setMeta] = useState();
  const { perPage, pageNumber } = useBoundStore(
    (state) => state.paginationState,
  );

  const { data, status, error } = useQuery({
    queryKey: ["venues", pageNumber, perPage],
    queryFn: () => fetchAllVenues({ pageParam: pageNumber, perPage }),
  });
  const filters = useBoundStore((state) => state.filters);

  useEffect(() => {
    if (data && filters) {
      const filteredVenues = filterVenues(data.data.data, filters);
      setFilteredData(filteredVenues);
      setMeta(data.data.meta);
    }
  }, [data, filters]);

  return { data, status, error, filteredData, meta };
}

function filterVenues(data, filters) {
  const filteredVenues = data.filter((item) => {
    const priceInRange =
      item.price <= filters.maxPrice && item.price >= filters.minPrice;
    const maxGuestsInRange = item.maxGuests >= filters.maxGuests;
    const petsMatch = !filters.pets || item.meta.pets === filters.pets;
    const wifiMatch = !filters.wifi || item.meta.wifi === filters.wifi;
    const parkingMatch =
      !filters.parking || item.meta.parking === filters.parking;
    const breakfastMatch =
      !filters.breakfast || item.meta.breakfast === filters.breakfast;

    return (
      priceInRange &&
      maxGuestsInRange &&
      petsMatch &&
      wifiMatch &&
      parkingMatch &&
      breakfastMatch
    );
  });

  return filteredVenues;
}
