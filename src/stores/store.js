import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import { createBookingSlice } from "./bookingSlice";
import { persist } from "zustand/middleware";
import { createVenueSlice } from "./venueFormSlice";

export const useBoundStore = create(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
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
);
