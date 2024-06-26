import { useBoundStore } from "../../stores/store";
import { cn } from "../../utils/utils";
import { Button } from "../ui/button";

export function ChosenFilters({ className }) {
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

  const hasBeenFiltered =
    maxGuests > 1 ||
    maxPrice < 10000 ||
    minPrice > 1 ||
    pets ||
    parking ||
    wifi ||
    breakfast ||
    dateFrom ||
    dateTo;

  return (
    <div
      className={cn(
        "flex max-w-full flex-col  gap-4",
        !hasBeenFiltered && "hidden",
        className,
      )}
    >
      <div className="flex gap-2 overflow-x-auto">
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
      {hasBeenFiltered && (
        <Button variant="outline" className="bg-inherit" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );
}

export function ChosenFilterButton({ onDelete, children }) {
  return (
    <div className="flex gap-2 rounded-full border border-muted-foreground bg-secondary px-4 py-2 text-sm text-primary">
      <div className="flex text-nowrap">{children}</div>
      <button onClick={onDelete}>x</button>
    </div>
  );
}
