export const createVenueSlice = (set) => ({
  venueFormData: {
    name: "",
    description: "",
    media: [],
    price: 0,
    maxGuests: 100,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  },

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
