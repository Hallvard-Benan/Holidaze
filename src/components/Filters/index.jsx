import { IoClose } from "react-icons/io5";
import { useBoundStore } from "../../stores/store";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "../../utils/utils";
import NumberButtons from "../ui/numberButtons";
import PriceSlider from "../ui/price-slider";
import { CheckBoxGroup } from "../ui/inputGroup";
import { useEffect } from "react";
import { ChosenFilters } from "../ChosenFilters";
import AreYouSure from "../ui/areYouSure";
import { SlidersHorizontal } from "lucide-react";

export function FilterGrouping({ children, title }) {
  return (
    <div className="grid gap-2 rounded-md pt-4">
      <h3 className="text-lg">{title}</h3>
      {children}
    </div>
  );
}

export default function FiltersSection({ onSubmit, variant, className }) {
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
        variant={variant === "small" ? "outline" : "default"}
        className={cn(
          "flex h-full items-center gap-2",
          variant === "home" &&
            "  rounded-full bg-inherit text-lg text-muted-foreground",

          className,
          variant === "small" && "w-20 rounded-full ",
        )}
      >
        {numOfFilters > 0 && variant !== "home" && (
          <p className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary p-2 text-secondary-foreground">
            {numOfFilters}
          </p>
        )}
        {variant !== "home" && variant !== "small" && <p>Filters</p>}
        <SlidersHorizontal size={20} />
      </Button>
      {Object.entries(filterForm).toString() !==
      Object.entries(filters).toString() ? (
        <AreYouSure
          buttonText={<IoClose />}
          confirmVariant={"default"}
          title={"Save changes?"}
          description={"Do you want to apply the filters?"}
          onConfirm={handleUpdate}
          onCancel={() => {
            toggleFiltersOpen();
            cancelFilterForm();
          }}
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
        className={`md: fixed bottom-0 left-1/2 z-50 flex h-[85dvh] w-[500px] max-w-[100vw] -translate-x-1/2 flex-col justify-between overflow-y-auto rounded-t-xl  bg-gray-100 pt-6  transition-all duration-300 ease-out sm:left-auto sm:right-0 sm:top-0 sm:h-[100dvh] sm:rounded-l-xl sm:rounded-tr-none lg:h-[100dvh] ${
          filtersOpen
            ? "translate-y-0 opacity-100 sm:translate-x-0"
            : "translate-y-full opacity-0 sm:translate-x-full sm:translate-y-0"
        }`}
      >
        <div className="flex justify-between border-b border-[#E8E8E8] px-4 sm:px-8">
          <h2 className="mb-2  text-2xl font-medium">Filters</h2>
          {Object.entries(filterForm).toString() !==
          Object.entries(filters).toString() ? (
            <AreYouSure
              confirmVariant={"default"}
              buttonText={<IoClose />}
              title={"Save changes?"}
              description={"Do you want to apply the filters?"}
              onConfirm={handleUpdate}
              onCancel={toggleFiltersOpen}
              className={"bg-inherit text-inherit "}
              confirmText={"Apply"}
              cancelText={"Discard"}
            />
          ) : (
            <button
              type="button"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-0 bg-inherit",
              )}
              onClick={toggleFiltersOpen}
            >
              <IoClose />
            </button>
          )}
        </div>

        <ul className="flex min-w-full flex-grow flex-col gap-4 divide-y overflow-y-auto px-4 py-4 sm:gap-8 sm:px-8">
          {numOfFilters !== 0 && <ChosenFilters className={"px-4 sm:px-8"} />}
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
          <FilterGrouping title={"Guests"}>
            <NumberButtons
              value={filterForm.maxGuests}
              maxValue={100}
              onDecrease={decreaseGuests}
              onIncrease={increaseGuests}
            />
          </FilterGrouping>
          <FilterGrouping title={"Amenities"}>
            <div className="grid  gap-x-16 gap-y-8">
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
