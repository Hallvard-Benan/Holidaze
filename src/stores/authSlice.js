export const createAuthSlice = (set) => ({
  isVendor: false,
  isLoggedIn: false,
  user: {},
  avatar: "",
  login: () => set(() => ({ isLoggedIn: true })),
  logout: () => set(() => ({ isLoggedIn: false, user: {} })),
  setIsVendor: () => () => ({ isVendor: true }),
  updateUser: (user) => set(() => ({ user: user })),
  updateAvatar: (avatar) => set(() => ({ avatar: avatar })),
});
