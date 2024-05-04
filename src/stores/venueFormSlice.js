export const createVenueSlice = (set) => ({
  venueFormData: {},

  updateVenueForm: (data) =>
    set(() => ({
      venueFormData: data,
    })),

  updateItem: (item) =>
    set((state) => ({
      venueFormData: { ...state.venueFormData, ...item },
    })),
  updateMeta: (item) =>
    set((state) => ({
      venueFormData: {
        ...state.venueFormData,
        meta: { ...state.venueFormData.meta, ...item },
      },
    })),
  updateLocation: (item) =>
    set((state) => ({
      venueFormData: {
        ...state.venueFormData,
        location: { ...state.venueFormData.location, ...item },
      },
    })),

  clearVenueForm: () =>
    set(() => ({
      venueFormData: {},
    })),
});
