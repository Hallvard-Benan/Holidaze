import { IoClose } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";

import { useBoundStore } from "../../stores/store";
import { Button } from "../ui/button";
import { cn } from "../../utils/utils";
import NumberButtons from "../ui/numberButtons";
import PriceSlider from "../ui/price-slider";
import { CheckBoxGroup, InputGroup } from "../ui/inputGroup";
import { useEffect } from "react";
import { ChosenFilters } from "../ChosenFilters";

export function FilterGrouping({ children, title }) {
  return (
    <div className="bg-card grid gap-2 rounded-md p-4">
      <h3 className="text-lg">{title}</h3>
      {children}
    </div>
  );
}

export default function FiltersSection() {
  const filtersOpen = useBoundStore((state) => state.filtersOpen);
  const toggleFiltersOpen = useBoundStore((state) => state.toggleFiltersOpen);
  const updatePriceRange = useBoundStore((state) => state.updatePriceRange);
  const filterForm = useBoundStore((state) => state.filterForm);
  const updateFilters = useBoundStore((state) => state.updateFilters);
  const increaseGuests = useBoundStore((state) => state.increaseGuests);
  const decreaseGuests = useBoundStore((state) => state.decreaseGuests);
  const updateMinPrice = useBoundStore((state) => state.updateMinPrice);
  const updateMaxPrice = useBoundStore((state) => state.updateMaxPrice);
  const updatePets = useBoundStore((state) => state.updatePets);
  const updateParking = useBoundStore((state) => state.updateParking);
  const updateWifi = useBoundStore((state) => state.updateWifi);
  const updateBreakfast = useBoundStore((state) => state.updateBreakfast);

  const handleUpdate = () => {
    updateFilters();
    toggleFiltersOpen();
  };

  useEffect(() => {
    if (filtersOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [filtersOpen]);

  const numOfFilters =
    (filterForm.maxGuests > 1 ? 1 : 0) +
    (filterForm.maxPrice < 10000 ? 1 : 0) +
    (filterForm.minPrice > 1 ? 1 : 0) +
    (filterForm.pets ? 1 : 0) +
    (filterForm.parking ? 1 : 0) +
    (filterForm.wifi ? 1 : 0) +
    (filterForm.breakfast ? 1 : 0) +
    (filterForm.dateFrom ? 1 : 0) +
    (filterForm.dateTo ? 1 : 0);

  return (
    <>
      <Button
        onClick={toggleFiltersOpen}
        className={cn("flex items-center gap-2", [])}
      >
        {numOfFilters > 0 && (
          <p className="text-secondary-foreground flex h-6 w-6 items-center justify-center rounded-full bg-secondary p-2">
            {numOfFilters}
          </p>
        )}
        <p>Filters</p>
        <IoFilter />
      </Button>
      <div
        className={cn(
          ` fixed left-0 top-0 z-40 h-screen w-screen overflow-auto bg-gray-700 opacity-0 transition-opacity duration-500 ${
            filtersOpen ? "opacity-50" : "pointer-events-none opacity-0"
          }`,
        )}
        onClick={toggleFiltersOpen}
      ></div>
      <div
        className={`fixed right-0 top-0 z-50 flex h-[100dvh] w-[800px] max-w-[97vw] flex-col  justify-between overflow-y-scroll bg-gray-100 px-2 py-6 transition-all duration-500 md:p-8 lg:h-[100dvh] ${
          filtersOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex justify-between">
          <h2 className="mb-2 text-2xl font-medium">Filters</h2>
          <button onClick={toggleFiltersOpen} className="text-2xl">
            <IoClose />
          </button>
        </div>

        <ul className="flex min-w-full flex-grow flex-col gap-8 overflow-y-auto py-4">
          <ChosenFilters />

          <FilterGrouping title={"Dates"}>
            <div className="flex  gap-4">
              <InputGroup
                type="date"
                name="dateFrom"
                label="From"
                className="w-full"
                onChange={(e) => {}}
              />
              <InputGroup type="date" name="dateTo" label="To" />
            </div>
          </FilterGrouping>
          <FilterGrouping title={"Guests"}>
            <NumberButtons
              value={filterForm.maxGuests}
              maxValue={100}
              onDecrease={decreaseGuests}
              onIncrease={increaseGuests}
            />
          </FilterGrouping>
          <FilterGrouping title={"Amenities"}>
            <div className="grid grid-cols-2 sm:grid-cols-4">
              <CheckBoxGroup
                type="checkbox"
                name="pets"
                onCheckedChange={(e) => updatePets(e)}
                label="Pets"
                checked={filterForm.pets}
              />
              <CheckBoxGroup
                type="checkbox"
                name="wifi"
                onCheckedChange={(e) => updateWifi(e)}
                label="Wifi"
                checked={filterForm.wifi}
              />
              <CheckBoxGroup
                type="checkbox"
                name="breakfast"
                onCheckedChange={(e) => updateBreakfast(e)}
                label="Breakfast"
                checked={filterForm.breakfast}
              />
              <CheckBoxGroup
                type="checkbox"
                name="parking"
                onCheckedChange={(e) => {
                  updateParking(e);
                }}
                label="Parking"
                checked={filterForm.parking}
              />
            </div>
          </FilterGrouping>

          <FilterGrouping title={"Price Range"}>
            <PriceSlider
              minPrice={filterForm.minPrice}
              maxPrice={filterForm.maxPrice}
              onMinValueChange={(value) => {
                updateMinPrice(value);
              }}
              onMaxValueChange={updateMaxPrice}
              onChange={(e) => {
                updatePriceRange({ min: e[0], max: e[1] });
              }}
            />
          </FilterGrouping>
        </ul>
        <Button onClick={handleUpdate} className="w-full">
          Apply Updated Filters
        </Button>
      </div>
    </>
  );
}
