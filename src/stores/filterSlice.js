export const createFilterSlice = (set, get) => ({
  defaultFilters: {
    maxGuests: 1,
    maxPrice: 10000,
    minPrice: 0,
    pets: false,
    parking: false,
    wifi: false,
    dateFrom: "",
    dateTo: "",
    breakfast: false,
  },

  filters: {
    maxGuests: 1,
    maxPrice: 10000,
    minPrice: 0,
    pets: false,
    parking: false,
    wifi: false,
    dateFrom: "",
    dateTo: "",
    breakfast: false,
  },
  filterForm: {
    maxGuests: 1,
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
  updateFilters: () =>
    set(() => ({
      filters: get().filterForm,
    })),
  updateSort: (choice) =>
    set(() => ({
      sort: choice,
    })),

  updatePriceRange: ({ min, max }) => {
    set((state) => {
      state.filterForm.minPrice = min;
      state.filterForm.maxPrice = max;
    });
  },

  removeIndividual: (target) => {
    set((state) => {
      const defaultValue = get().defaultFilters[target];
      state.filterForm[target] = defaultValue;
      state.filters[target] = defaultValue;
    });
  },

  decreaseGuests: () => {
    set((state) => {
      if (state.guests === 1) return;
      state.filterForm.maxGuests--;
    });
  },

  increaseGuests: () => {
    set((state) => {
      state.filterForm.maxGuests++;
    });
  },

  updateMaxPrice: (value) =>
    set((state) => {
      state.filterForm.maxPrice = value;
    }),

  updatePets: (value) =>
    set((state) => {
      state.filterForm.pets = value;
    }),

  updateParking: (value) =>
    set((state) => {
      state.filterForm.parking = value;
    }),

  updateWifi: (value) =>
    set((state) => {
      state.filterForm.wifi = value;
    }),

  updateBreakfast: (value) =>
    set((state) => {
      state.filterForm.breakfast = value;
    }),

  updateMinPrice: (value) =>
    set((state) => {
      state.filterForm.minPrice = value;
    }),

  clearFilters: () =>
    set((state) => {
      const defaultFilters = get().defaultFilters;
      state.filters = defaultFilters;
      state.filterForm = defaultFilters;
    }),
});
