import { Link, NavLink, useMatch, useMatches } from "react-router-dom";
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

  const matches = useMatches();

  console.log("matches", matches);

  const activeStyles = "text-primary underline";

  const currentPath = matches[1].pathname;

  const routes = ["new-venue", "profiles"];

  const activeRoute =
    currentPath === "/"
      ? "/"
      : currentPath === "/venues"
        ? "venues"
        : routes.find((item) => currentPath.includes(item));

  return (
    <nav className=" mx-auto grid grid-cols-4 items-center justify-between justify-items-center bg-card py-2 text-xl sm:flex sm:px-4 md:w-calc">
      <NavLink
        to={"/"}
        className={cn(
          " flex flex-col items-center  justify-center gap-1 p-2 text-muted-foreground  sm:px-4",
          activeRoute === "/" && activeStyles,
        )}
      >
        <div className="flex size-8 items-center justify-center">
          <img
            src="/holidayhelper-logo.svg"
            alt="Holiday Helper Logo"
            className="size-6 sm:size-10"
          />
        </div>
        <p className="text-xs sm:hidden">Home</p>{" "}
      </NavLink>

      {user.venueManager && (
        <NavLink
          className={cn(
            "flex flex-col-reverse items-center gap-1 rounded-full bg-transparent p-2 text-muted-foreground sm:flex-row sm:gap-2 sm:bg-primary sm:px-4 sm:py-1.5 sm:text-primary-foreground",
            activeRoute === "new-venue" && activeStyles,
          )}
          to={"/new-venue"}
        >
          <p className="text-xs sm:text-base md:text-lg">New venue</p>{" "}
          <div className="flex size-8 items-center justify-center">
            <FaPlus size={"20px"} />
          </div>
        </NavLink>
      )}

      <NavLink
        to={"/venues"}
        className={cn(
          "flex flex-col items-center gap-1 text-muted-foreground md:hidden",
          activeRoute === "venues" && activeStyles,
        )}
      >
        <div className="flex size-8 items-center justify-center">
          <FaSearch size={"24px"} />
        </div>
        <p className="text-xs sm:hidden">Discover</p>{" "}
      </NavLink>

      <div className="flex items-center gap-4">
        <div className="hidden w-60 md:block">
          <Search onSearch={handleSearch} variant="header" />
        </div>
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex flex-col items-center gap-1 text-xs text-muted-foreground sm:flex-row",
                activeRoute === "profiles" && activeStyles,
              )}
            >
              <div
                className={cn(
                  "flex size-8  items-center justify-center rounded-full border border-primary sm:size-[2.8rem]",
                )}
              >
                <img
                  className="size-8 rounded-full object-cover sm:size-10"
                  src={
                    status === "success"
                      ? data.data.data.avatar.url
                      : user.avatar.url
                  }
                />
              </div>
              <p className="sm:hidden ">Profile</p>{" "}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col-reverse gap-1 md:flex-col ">
              <Link to={`/profiles/${user.name}`}>
                <DropdownMenuItem className="flex flex-col hover:cursor-pointer md:flex-col-reverse">
                  <div className="flex items-center gap-1 px-6">
                    <p>My Profile</p> <LuUser2></LuUser2>
                  </div>
                  <div className="grid justify-items-center text-muted-foreground">
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
                "rounded-full bg-primary px-4 py-2 text-primary-foreground",
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
