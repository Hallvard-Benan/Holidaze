export const createPaginationSlice = (set) => ({
  paginationState: { pageNumber: 1, perPage: 12 },

  updatePageNumber: (number) =>
    set((state) => {
      state.paginationState.pageNumber = number;
    }),

  updatePerPage: (number) =>
    set((state) => {
      state.paginationState.perPage = number;
    }),
});
