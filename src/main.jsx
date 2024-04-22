import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import VenuePage from "./pages/VenuePage";

import { loader as venueLoader } from "./pages/VenuePage";
import { loader as userLoader } from "./pages/UserPage";
import { loader as authLoader } from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import VenuesPage from "./pages/VenuesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/auth/:formVersion",
        element: <LoginPage />,
        loader: authLoader,
      },
      { path: "/venues", element: <VenuesPage /> },
      { path: "/venues/:venueId", element: <VenuePage />, loader: venueLoader },
      {
        path: "/profiles/:userName",
        element: <UserPage />,
        loader: userLoader,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
