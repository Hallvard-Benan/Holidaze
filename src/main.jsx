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
import UserPage from "./pages/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/auth/:formVersion", element: <LoginPage /> },
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
