export const createVenueSlice = (set, get) => ({
  editVenueFormData: {},

  venueFormData: {
    name: "",
    description: "",
    media: [],
    price: "",
    maxGuests: 1,
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
  validation: {},

  setValidation: (newValidation) =>
    set((state) => {
      state.validation = newValidation;
    }),

  updateVenueForm: (data) =>
    set((state) => {
      state.venueFormData = data;
    }),
  updateEditVenueForm: (data) =>
    set((state) => {
      state.editVenueFormData = data;
    }),

  updateItem: (item) =>
    set((state) => {
      state.venueFormData = {
        ...state.venueFormData,
        ...item,
      };
    }),

  increaseItem: (item) => {
    set((state) => {
      if (item === "price" && get().venueFormData.price >= 10000) return;
      if (item === "maxGuests" && get().venueFormData.maxGuests >= 100) return;
      if (item === "rating" && get().venueFormData.rating >= 5) return;
      state.venueFormData[item]++;
    });
  },
  decreaseItem: (item) =>
    set((state) => {
      if (state.venueFormData[item] === 0) return;
      state.venueFormData[item]--;
    }),
  updateEditItem: (item) =>
    set((state) => {
      state.editVenueFormData = {
        ...state.editVenueFormData,
        ...item,
      };
    }),

  increaseEditItem: (item) => {
    set((state) => {
      if (item === "price" && get().editVenueFormData.price >= 10000) return;
      if (item === "maxGuests" && get().editVenueFormData.maxGuests >= 100)
        return;
      if (item === "rating" && get().editVenueFormData.rating >= 5) return;
      state.editVenueFormData[item]++;
    });
  },
  decreaseEditItem: (item) =>
    set((state) => {
      if (state.editVenueFormData[item] === 0) return;
      state.editVenueFormData[item]--;
    }),

  updateMeta: (item) =>
    set((state) => {
      state.venueFormData.meta = {
        ...state.venueFormData.meta,
        ...item,
      };
    }),

  updateEditMeta: (item) =>
    set((state) => {
      state.editVenueFormData.meta = {
        ...state.editVenueFormData.meta,
        ...item,
      };
    }),

  updateLocation: (item) =>
    set((state) => {
      state.venueFormData.location = {
        ...state.venueFormData.location,
        ...item,
      };
    }),
  updateEditLocation: (item) =>
    set((state) => {
      state.editVenueFormData.location = {
        ...state.editVenueFormData.location,
        ...item,
      };
    }),

  clearVenueForm: () =>
    set((state) => {
      state.venueFormData = {
        name: "",
        description: "",
        media: [],
        price: 0,
        maxGuests: 1,
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
      };
    }),
});
