import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import { createBookingSlice } from "./bookingSlice";
import { persist } from "zustand/middleware";

export const useBoundStore = create(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createBookingSlice(...a),
    }),
    { name: "Auth-storage" },
  ),
);
