export const createAuthSlice = (set) => ({
  isLoggedIn: false,
  user: {},
  accessToken: "",

  login: (token) =>
    set(() => ({
      isLoggedIn: true,
      accessToken: token,
    })),

  logout: () =>
    set(() => ({
      isLoggedIn: false,
      user: {},
      accessToken: "",
    })),

  updateUser: (newUser) =>
    set(() => ({
      user: newUser,
    })),
});
