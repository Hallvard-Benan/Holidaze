import { useBoundStore } from "../../stores/store";
import { Button } from "../ui/button";

export function ChosenFilters() {
  const {
    maxGuests,
    maxPrice,
    minPrice,
    pets,
    parking,
    wifi,
    breakfast,
    dateFrom,
    dateTo,
  } = useBoundStore((state) => state.filters);
  const clearFilters = useBoundStore((state) => state.clearFilters);
  const updateFilters = useBoundStore((state) => state.updateFilters);

  const removeIndividual = useBoundStore((state) => state.removeIndividual);

  const handleDelete = (target) => {
    removeIndividual(target);
    updateFilters();
  };

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" onClick={clearFilters}>
        Clear filters X
      </Button>
      {maxGuests > 1 && (
        <ChosenFilterButton onDelete={() => handleDelete("maxGuests")}>
          {" "}
          Guests: {maxGuests}
        </ChosenFilterButton>
      )}
      {(maxPrice < 10000 || minPrice > 1) && (
        <ChosenFilterButton
          onDelete={() => {
            handleDelete("maxPrice");
            handleDelete("minPrice");
          }}
        >
          <p> {minPrice} </p>-<p> {maxPrice}kr</p>
        </ChosenFilterButton>
      )}
      {parking && (
        <ChosenFilterButton onDelete={() => handleDelete("parking")}>
          Parking
        </ChosenFilterButton>
      )}{" "}
      {wifi && (
        <ChosenFilterButton onDelete={() => handleDelete("wifi")}>
          {" "}
          Wifi{" "}
        </ChosenFilterButton>
      )}
      {breakfast && (
        <ChosenFilterButton onDelete={() => handleDelete("breakfast")}>
          {" "}
          Breakfast{" "}
        </ChosenFilterButton>
      )}
      {pets && (
        <ChosenFilterButton onDelete={() => handleDelete("pets")}>
          Pets
        </ChosenFilterButton>
      )}
    </div>
  );
}

export function ChosenFilterButton({ onDelete, children }) {
  return (
    <div className="flex gap-2 rounded-full bg-muted px-4 py-2">
      {children}
      <button onClick={onDelete}>x</button>
    </div>
  );
}
