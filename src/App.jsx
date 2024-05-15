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

  const { data } = useUser(user.name);
  useEffect(() => {
    if (data) {
      console.log("fetching my own user");
      updateUser(data.data.data);
    }
  }, [data, updateUser]);

  return (
    <div className="bg-background grid min-h-screen grid-rows-[auto,1fr,auto]">
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
