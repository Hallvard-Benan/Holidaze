export const createFilterSlice = (set) => ({
  filters: { maxGuests: 0, price: 100000, country: null },
  sort: { by: "abc", order: "desc" },

  updateFilters: (options) =>
    set(() => ({
      filters: options,
    })),
  updateSort: (choice) =>
    set(() => ({
      sort: choice,
    })),
});
