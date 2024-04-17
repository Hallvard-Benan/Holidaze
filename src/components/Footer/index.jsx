import { NavLink } from "react-router-dom";
export default function Footer() {
  return (
    <nav className="bg-black h-40 text-white text-xl">
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
