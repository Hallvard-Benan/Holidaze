import { Link, NavLink } from "react-router-dom";
import { useBoundStore } from "../../stores/store";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { FiLogOut } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";

import { FaPlus } from "react-icons/fa";

import { cn } from "../../utils/utils";
import Search from "../ui/search";

export default function NavBar() {
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);
  const logout = useBoundStore((state) => state.logout);
  const user = useBoundStore((state) => state.user);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    navigate(`/venues?search=${searchTerm}`);
  };

  return (
    <nav className=" bg-card mx-auto flex items-center justify-between px-4 py-2 text-xl md:w-calc">
      <NavLink className={cn("font-bold italic")} to={"/"}>
        <img
          src="/holidayhelper-logo.svg"
          alt="Holiday Helper Logo"
          className="size-10"
        />
      </NavLink>

      {user.venueManager && (
        <NavLink
          className={
            "text-primary-foreground flex items-center gap-2 rounded-full bg-primary p-2 px-4"
          }
          to={"/new-venue"}
        >
          <p className="text-sm sm:text-base md:text-lg">New venue</p>{" "}
          <FaPlus />
        </NavLink>
      )}

      <NavLink to={"/venues"} className="text-muted-foreground md:hidden">
        <FaSearch />
      </NavLink>

      <div className="flex items-center gap-4">
        <div className="hidden w-60 md:block">
          <Search onSearch={handleSearch} variant="header" />
        </div>
        {isLoggedIn ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-2xl">
                <div className="flex h-[2.8rem] w-[2.8rem] items-center justify-center rounded-full border border-primary">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={
                      status === "success"
                        ? data.data.data.avatar.url
                        : user.avatar.url
                    }
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col-reverse gap-1 md:flex-col ">
                <Link to={`/profiles/${user.name}`}>
                  <DropdownMenuItem className="flex flex-col hover:cursor-pointer md:flex-col-reverse">
                    <div className="flex items-center gap-1 px-6">
                      <p>My Profile</p> <LuUser2></LuUser2>
                    </div>
                    <div className="text-muted-foreground grid justify-items-center">
                      <p>{user.name}</p>
                    </div>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                {user.venueManager && (
                  <Link to={`/profiles/${user.name}/venues`}>
                    <DropdownMenuItem className="px-8 hover:cursor-pointer">
                      My Venues
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuSeparator />
                <Link to={`/profiles/${user.name}/bookings`}>
                  <DropdownMenuItem className="px-8 hover:cursor-pointer">
                    My bookings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  data-cy="logout-button"
                  className="px-8 text-destructive hover:cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout <FiLogOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            {" "}
            <NavLink
              className={cn(" px-4 py-2 text-primary")}
              to={"/auth/login"}
            >
              Login
            </NavLink>
            <NavLink
              className={cn(
                ({ isActive }) => (isActive ? "font-bold" : "", "bg-primary"),
                "text-primary-foreground rounded-full bg-primary px-4 py-2",
              )}
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
