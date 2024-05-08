import { useQuery } from "@tanstack/react-query";
import { fetchAllVenues } from "../api/venues";
import { useBoundStore } from "../stores/store";
import { useEffect, useState } from "react";
export default function useAllVenues() {
  const [filteredData, setFilteredData] = useState();
  const { data, status, error } = useQuery({
    queryKey: ["venues"],
    queryFn: () => fetchAllVenues(),
  });
  const filters = useBoundStore((state) => state.filters);

  useEffect(() => {
    if (data && filters) {
      const filteredVenues = filterVenues(data.data.data, filters);
      setFilteredData(filteredVenues);
    }
  }, [data, filters]);

  return { data, status, error, filteredData };
}

function filterVenues(data, filters) {
  const filteredVenues = data.filter((item) => {
    return (
      item.price <= filters.maxPrice &&
      item.price >= filters.minPrice &&
      item.maxGuests >= filters.maxGuests &&
      (!filters.pets || item.meta.pets === filters.pets) &&
      (!filters.wifi || item.meta.wifi === filters.wifi) &&
      (!filters.parking || item.meta.parking === filters.parking) &&
      (!filters.breakfast || item.meta.breakfast === filters.breakfast)
    );
  });
  return filteredVenues;
}
