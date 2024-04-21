import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import { persist } from "zustand/middleware";

export const useBoundStore = create(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
    }),
    { name: "Auth-storage" }
  )
);
