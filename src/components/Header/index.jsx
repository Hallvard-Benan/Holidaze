import { NavLink } from "react-router-dom";
import { useBoundStore } from "../../stores/store";
import { useNavigate } from "react-router-dom";
import Search from "../ui/search";
export default function NavBar() {
  const { isLoggedIn, logout, user } = useBoundStore();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    navigate(`/venues?search=${searchTerm}`);
  };
  return (
    <nav className=" text-xl flex justify-between px-4 py-2 bg-slate-200">
      <NavLink
        className={({ isActive }) => (isActive ? "underline" : "")}
        to={"/"}
      >
        Home
      </NavLink>
      <div className="flex gap-2">
        <Search onSearch={handleSearch} />
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

            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              logout
            </button>
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
