import { IoClose } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";

import { useBoundStore } from "../../stores/store";
import { Button } from "../ui/button";
import { cn } from "../../utils/utils";
import NumberButtons from "../ui/numberButtons";
import PriceSlider from "../ui/price-slider";
import { CheckBoxGroup, InputGroup } from "../ui/inputGroup";
import { useEffect } from "react";

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
  const filters = useBoundStore((state) => state.filters);
  const updateFilters = useBoundStore((state) => state.updateFilters);
  const increaseGuests = useBoundStore((state) => state.increaseGuests);
  const decreaseGuests = useBoundStore((state) => state.decreaseGuests);
  const updateMinPrice = useBoundStore((state) => state.updateMinPrice);
  const updateMaxPrice = useBoundStore((state) => state.updateMaxPrice);
  const updateMeta = useBoundStore((state) => state.updateMeta);

  const handleUpdate = () => {
    toggleFiltersOpen();
  };

  useEffect(() => {
    if (filtersOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [filtersOpen]);

  return (
    <>
      <Button onClick={toggleFiltersOpen} variant="outline">
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
        className={`fixed right-0 top-0 z-50 flex h-screen w-[800px] max-w-[97vw] flex-col  justify-between overflow-hidden overflow-y-scroll bg-gray-100 px-2 py-6 transition-all duration-500 md:p-8 lg:h-[100dvh] ${
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
              value={filters.maxGuests}
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
                onCheckedChange={(e) => updateMeta(e, "pets")}
                label="Pets"
                defaultChecked={filters.pets}
              />
              <CheckBoxGroup
                type="checkbox"
                name="wifi"
                onCheckedChange={(e) => updateMeta(e, "wifi")}
                label="Wifi"
                defaultChecked={filters.Wifi}
              />
              <CheckBoxGroup
                type="checkbox"
                name="breakfast"
                onCheckedChange={(e) => updateMeta(e, "breakfast")}
                label="Breakfast"
                defaultChecked={filters.breakfast}
              />
              <CheckBoxGroup
                type="checkbox"
                name="parking"
                onCheckedChange={(e) => {
                  updateMeta(e, "parking");
                }}
                label="Parking"
                defaultChecked={filters.parking}
              />
            </div>
          </FilterGrouping>

          <FilterGrouping title={"Price Range"}>
            <PriceSlider
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
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
          update filters
        </Button>
      </div>
    </>
  );
}