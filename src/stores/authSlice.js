export const createAuthSlice = (set) => ({
  isLoggedIn: false,
  user: {},
  accessToken: "",

  login: (token) =>
    set((state) => ({ ...state, isLoggedIn: true, accessToken: token })),
  logout: () => set(() => ({ isLoggedIn: false, user: {}, accessToken: null })),
  updateUser: (user) => set((state) => ({ ...state, user: user })),
});
