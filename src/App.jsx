import { Outlet } from "react-router-dom";
import "./index.css";
import NavBar from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="grid min-h-screen grid-rows-[auto,1fr,auto] ">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
