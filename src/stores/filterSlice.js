export const createFilterSlice = (set) => ({
  filters: {
    maxGuests: 0,
    maxPrice: 10000,
    minPrice: 0,
    pets: false,
    parking: false,
    wifi: false,
    dateFrom: "",
    dateTo: "",
    breakfast: false,
  },
  sort: { by: "abc", order: "desc" },
  filtersOpen: false,

  toggleFiltersOpen: () =>
    set((state) => ({
      filtersOpen: !state.filtersOpen,
    })),
  updateFilters: (options) =>
    set(() => ({
      filters: options,
    })),
  updateSort: (choice) =>
    set(() => ({
      sort: choice,
    })),

  updatePriceRange: ({ min, max }) => {
    set((state) => ({
      filters: { ...state.filters, minPrice: min, maxPrice: max },
    }));
  },

  decreaseGuests: () => {
    set((state) => ({
      filters: { ...state.filters, maxGuests: state.filters.maxGuests - 1 },
    }));
  },

  increaseGuests: () => {
    set((state) => ({
      filters: { ...state.filters, maxGuests: state.filters.maxGuests + 1 },
    }));
  },

  updateMaxPrice: (value) =>
    set((state) => ({
      filters: { ...state.filters, maxPrice: value },
    })),

  updateMeta: (value, target) => {
    console.log(value, target);
    switch (target) {
      case "pets":
        set((state) => ({
          filters: { ...state.filters, pets: value },
        }));
        break;
      case "parking":
        set((state) => ({
          filters: { ...state.filters, parking: value },
        }));
        break;
      case "wifi":
        set((state) => ({
          filters: { ...state.filters, wifi: value },
        }));
        break;
      case "breakfast":
        set((state) => ({
          filters: { ...state.filters, breakfast: value },
        }));
        break;
      default:
        console.log(value, target);
        break;
    }
  },

  updateMinPrice: (value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        minPrice: value,
      },
    })),
});
