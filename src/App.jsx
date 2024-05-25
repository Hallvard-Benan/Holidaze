import { useEffect, useRef, useState } from "react";
import { Outlet, useMatches } from "react-router-dom";
import "./index.css";
import NavBar from "./components/Header";
import Footer from "./components/Footer";
import useUser from "./hooks/useUser";
import { useBoundStore } from "./stores/store";
import { cn } from "./utils/utils";
import { Toaster, toast } from "sonner";

function App() {
  const user = useBoundStore((state) => state.user);
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);
  const updateUser = useBoundStore((state) => state.updateUser);
  const { data } = useUser(user?.name);
  const matches = useMatches();
  const onHomePage = matches[1].pathname === "/";
  const contentRef = useRef();
  const [scrollWidth, setScrollWidth] = useState(15);
  const [hasScrolled, setHasScrolled] = useState(false); // State to track scroll position

  useEffect(() => {
    if (data) {
      updateUser(data.data.data);
    }
  }, [data, updateUser]);

  useEffect(() => {
    const currentScrollBarWidth =
      window.innerWidth - contentRef.current.clientWidth;
    setScrollWidth(currentScrollBarWidth);
  }, [contentRef]);

  const handleScroll = () => {
    setHasScrolled(contentRef.current.scrollTop > 0);
  };

  return (
    <div
      className="grid h-[100dvh]  overflow-x-hidden bg-background"
      ref={contentRef}
      onScroll={handleScroll}
    >
      <Toaster richColors />
      <header
        className={cn(
          "fixed bottom-0 left-1/2 z-40 w-[100dvw] -translate-x-1/2 bg-card text-muted-foreground transition-colors duration-500 sm:bottom-auto",
          onHomePage &&
            !isLoggedIn &&
            "sm:bg-transparent sm:text-primary-foreground ",
          onHomePage &&
            !isLoggedIn &&
            hasScrolled &&
            " sm:bg-card sm:text-muted-foreground",
          `pr-[${scrollWidth}px]`,
        )}
      >
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
