import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import { createBookingSlice } from "./bookingSlice";
import { persist } from "zustand/middleware";
import { createVenueSlice } from "./venueFormSlice";
import { immer } from "zustand/middleware/immer";
import { createFilterSlice } from "./filterSlice";

export const useBoundStore = create(
  immer(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createFilterSlice(...a),
        ...createBookingSlice(...a),
        ...createVenueSlice(...a),
      }),
      {
        name: "Auth-storage",
        partialize: (state) => ({
          isLoggedIn: state.isLoggedIn,
          user: state.user,
          accessToken: state.accessToken,
        }),
      },
    ),
  ),
);
