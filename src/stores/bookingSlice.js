export const createBookingSlice = (set) => ({
  bookingFormState: { dateFrom: "", dateTo: "", guests: 0, venueId: "" },

  updateVenueId: (id) =>
    set((state) => {
      state.bookingFormState.venueId = id;
    }),

  updateDateTo: (date) =>
    set((state) => {
      state.bookingFormState.dateTo = date;
    }),

  updateDateFrom: (date) =>
    set((state) => {
      state.bookingFormState.dateFrom = date;
    }),

  updateGuests: (count) =>
    set((state) => {
      state.bookingFormState.guests = count;
    }),

  clearBookingState: () =>
    set(() => ({
      bookingFormState: {},
    })),
});
