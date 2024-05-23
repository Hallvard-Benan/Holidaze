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
import AreYouSure from "../ui/areYouSure";

export function FilterGrouping({ children, title }) {
  return (
    <div className="grid gap-2 rounded-md pt-4">
      <h3 className="text-lg">{title}</h3>
      {children}
    </div>
  );
}

export default function FiltersSection({ onSubmit }) {
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
  const cancelFilterForm = useBoundStore((state) => state.cancelFilterForm);
  const filters = useBoundStore((state) => state.filters);

  const handleUpdate = () => {
    updateFilters();
    toggleFiltersOpen();
    onSubmit && onSubmit();
  };

  useEffect(() => {
    if (filtersOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [filtersOpen]);

  const numOfFilters =
    (filters.maxGuests > 1 ? 1 : 0) +
    (filters.maxPrice < 10000 ? 1 : 0) +
    (filters.minPrice > 1 ? 1 : 0) +
    (filters.pets ? 1 : 0) +
    (filters.parking ? 1 : 0) +
    (filters.wifi ? 1 : 0) +
    (filters.breakfast ? 1 : 0) +
    (filters.dateFrom ? 1 : 0) +
    (filters.dateTo ? 1 : 0);

  return (
    <>
      <Button
        onClick={toggleFiltersOpen}
        className={cn("flex items-center gap-2", [])}
      >
        {numOfFilters > 0 && (
          <p className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary p-2 text-secondary-foreground">
            {numOfFilters}
          </p>
        )}
        <p>Filters</p>
        <IoFilter />
      </Button>
      {Object.entries(filterForm).toString() !==
      Object.entries(filters).toString() ? (
        <AreYouSure
          buttonText={<IoClose />}
          title={"Save changes?"}
          description={"Do you want to apply the filters before you?"}
          onConfirm={handleUpdate}
          onCancel={toggleFiltersOpen}
          cancelText={"Discard"}
          className={cn(
            ` fixed left-0 top-0 z-40 h-screen w-screen overflow-auto bg-gray-700 opacity-0 transition-opacity duration-500 ${
              filtersOpen
                ? "rounded-none opacity-50 hover:opacity-50"
                : "pointer-events-none opacity-0"
            }`,
          )}
          confirmText={"Apply"}
        />
      ) : (
        <div
          className={cn(
            ` fixed left-0 top-0 z-40 h-screen w-screen overflow-auto bg-gray-700 opacity-0 transition-opacity duration-500 ${
              filtersOpen ? "opacity-50" : "pointer-events-none opacity-0"
            }`,
          )}
          onClick={toggleFiltersOpen}
        ></div>
      )}
      <div
        className={`md: fixed bottom-0 left-1/2 z-50 flex h-[85dvh] w-[600px] max-w-[100vw] -translate-x-1/2 flex-col justify-between overflow-y-scroll rounded-t-xl  bg-gray-100 pt-6  transition-all duration-300 ease-out sm:left-auto sm:right-0 sm:top-0 sm:h-[100dvh] sm:rounded-l-xl sm:rounded-tr-none lg:h-[100dvh] ${
          filtersOpen
            ? "translate-y-0 opacity-100 sm:translate-x-0"
            : "translate-y-full opacity-0 sm:translate-x-full sm:translate-y-0"
        }`}
      >
        <div className="flex justify-between px-4 sm:px-8">
          <h2 className="mb-2  text-2xl font-medium">Filters</h2>
          {Object.entries(filterForm).toString() !==
          Object.entries(filters).toString() ? (
            <AreYouSure
              buttonText={<IoClose />}
              title={"Save changes?"}
              description={"Do you want to apply the filters before you?"}
              onConfirm={handleUpdate}
              onCancel={toggleFiltersOpen}
              className={"bg-inherit text-inherit "}
              confirmText={"Apply"}
              cancelText={"Discard"}
            />
          ) : (
            <button type="button" onClick={toggleFiltersOpen}>
              <IoClose />
            </button>
          )}
        </div>

        <ul className="flex min-w-full flex-grow flex-col gap-4 divide-y overflow-y-auto px-4 py-4 sm:gap-8 sm:px-8">
          <ChosenFilters className={"px-4 sm:px-8"} />
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
            <div className="mx-auto grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-4">
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
        <div className="border-t p-4">
          <Button onClick={handleUpdate} className="w-full">
            Apply Updated Filters
          </Button>
        </div>
      </div>
    </>
  );
}
