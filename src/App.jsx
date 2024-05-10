import { Outlet } from "react-router-dom";
import "./index.css";
import NavBar from "./components/Header";
import Footer from "./components/Footer";

function App() {
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
