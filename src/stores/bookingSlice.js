export const createBookingSlice = (set) => ({
  bookingFormState: { dateFrom: "", dateTo: "", guests: 0, venueId: "" },

  updateVenueId: (id) =>
    set((state) => ({
      bookingFormState: { ...state.bookingFormState, venueId: id },
    })),
  updateDateTo: (date) =>
    set((state) => ({
      bookingFormState: { ...state.bookingFormState, dateTo: date },
    })),
  updateDateFrom: (date) =>
    set((state) => ({
      bookingFormState: { ...state.bookingFormState, dateFrom: date },
    })),
  updateGuests: (count) =>
    set((state) => ({
      bookingFormState: { ...state.bookingFormState, guests: count },
    })),
});
