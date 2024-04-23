import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <nav className="h-40 bg-black text-xl text-white">
      <NavLink className={({ isActive }) => isActive && "underline"} to={"/"}>
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => isActive && "underline"}
        to={"/login"}
      >
        Login
      </NavLink>
    </nav>
  );
}
