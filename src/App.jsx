import { Outlet, useMatches } from "react-router-dom";
import "./index.css";
import NavBar from "./components/Header";
import Footer from "./components/Footer";
import useUser from "./hooks/useUser";
import { useBoundStore } from "./stores/store";
import { useEffect } from "react";
import { cn } from "./utils/utils";

function App() {
  const user = useBoundStore((state) => state.user);
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);
  const updateUser = useBoundStore((state) => state.updateUser);
  const { data } = useUser(user?.name);
  const matches = useMatches();
  const onHomePage = matches[1].pathname === "/";

  useEffect(() => {
    if (data) {
      updateUser(data.data.data);
    }
  }, [data, updateUser]);

  return (
    <div className="grid h-[100dvh]  overflow-x-hidden bg-background">
      <header className="fixed bottom-0 left-1/2 z-40 w-[100dvw] -translate-x-1/2 overflow-x-hidden sm:bottom-auto ">
        <NavBar />
      </header>

      <main
        className={cn(
          "pb-8 sm:mt-[64px]",
          !isLoggedIn && onHomePage && "sm:mt-0",
        )}
      >
        <Outlet />
      </main>
      <footer className="pb-[62px] sm:pb-0">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
