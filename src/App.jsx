import { Outlet } from "react-router-dom";
import "./index.css";
import NavBar from "./components/Header";
import Footer from "./components/Footer";
import useUser from "./hooks/useUser";
import { useBoundStore } from "./stores/store";
import { useEffect } from "react";

function App() {
  const user = useBoundStore((state) => state.user);
  const updateUser = useBoundStore((state) => state.updateUser);
  const { data } = useUser(user?.name);

  useEffect(() => {
    if (data) {
      console.log("fetching my own user");
      updateUser(data.data.data);
    }
  }, [data, updateUser]);

  return (
    <div className="grid h-[100dvh] bg-background ">
      <header className="fixed bottom-0 z-40 w-full sm:bottom-auto">
        <NavBar />
      </header>

      <main className="pb-8 sm:mt-[64px]">
        <Outlet />
      </main>
      <footer className="pb-[62px] sm:pb-0">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
