import { NavLink } from "react-router-dom";
import { useBoundStore } from "../../stores/store";

export default function NavBar() {
  const { isLoggedIn, logout, user } = useBoundStore();

  return (
    <nav className=" text-xl flex justify-between px-4 py-2 bg-slate-200">
      <NavLink
        className={({ isActive }) => (isActive ? "underline" : "")}
        to={"/"}
      >
        Home
      </NavLink>
      <div className="flex gap-2">
        {isLoggedIn ? (
          <>
            <NavLink to={`/profiles/${user.name}`}>
              <p>{user.name}</p>
              <img
                className="h-20"
                src={user.avatar.url}
                alt={user.avatar.alt}
              />
            </NavLink>

            <button onClick={logout}>logout</button>
          </>
        ) : (
          <>
            {" "}
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/auth/login"}
            >
              Login
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/auth/register"}
            >
              Register
            </NavLink>{" "}
          </>
        )}
      </div>
    </nav>
  );
}
