import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
    <nav className=" text-xl flex justify-between px-4 py-2 bg-slate-200">
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
