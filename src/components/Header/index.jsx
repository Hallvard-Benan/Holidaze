import { NavLink, useMatches } from "react-router-dom";
import { useBoundStore } from "../../stores/store";
import { useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

import { FaPlus } from "react-icons/fa";

import { cn } from "../../utils/utils";
import Search from "../ui/search";
import UserDropDown from "./menu";

export default function NavBar({ className }) {
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

  const activeStyles = "text-primary";

  const currentPath = matches[1].pathname;

  const routes = ["new-venue", "profiles"];

  const activeRoute =
    currentPath === "/"
      ? "/"
      : currentPath === "/venues"
        ? "venues"
        : routes.find((item) => currentPath.includes(item));

  return (
    <nav
      className={cn(
        " bg relative mx-auto grid grid-cols-4 items-center justify-between justify-items-center py-2 text-xl sm:flex  sm:w-calc ",
        className,
      )}
    >
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

      <NavLink
        className={cn(
          "flex flex-col-reverse items-center gap-1  bg-transparent p-2 text-muted-foreground sm:flex-row sm:gap-2  sm:px-4 sm:py-1.5 ",
          activeRoute === "new-venue" && activeStyles,
          activeRoute === "/" && !isLoggedIn && "text-inherit",
        )}
        to={
          isLoggedIn && user.venueManager
            ? "/new-venue"
            : !isLoggedIn
              ? "/auth/register"
              : "/become-host"
        }
      >
        <p className="text-xs sm:text-base md:text-lg">
          {user.venueManager ? "New venue" : "Become Host"}
        </p>{" "}
        <div className="flex size-8 items-center justify-center">
          <div
            className={cn(
              "size-[27px] sm:size-5 ",
              !user.venueManager && "sm:hidden",
            )}
          >
            <FaPlus size={"100%"} />
          </div>
        </div>
      </NavLink>

      <NavLink
        to={"/venues"}
        className={cn(
          "flex flex-col items-center gap-1 text-muted-foreground md:hidden",
          activeRoute === "venues" && activeStyles,
        )}
      >
        <div className="flex size-8 items-center justify-center ">
          <FaSearch size={"24px"} />
        </div>
        <p className="text-xs sm:hidden">Discover</p>{" "}
      </NavLink>

      <div className="flex items-center gap-4">
        <div className=" hidden w-60 text-muted-foreground md:block">
          <Search onSearch={handleSearch} variant="header" />
        </div>
        <UserDropDown
          user={user}
          handleLogout={handleLogout}
          activeRoute={activeRoute}
          activeStyles={activeStyles}
          isLoggedIn={isLoggedIn}
        />
        {!isLoggedIn && (
          <>
            <NavLink
              className={cn(
                " hidden px-4 py-2 sm:flex",
                activeRoute === "/" && !isLoggedIn && "text-inherit",
              )}
              to={"/auth/login"}
            >
              Login
            </NavLink>
            <NavLink
              className={cn(
                "hidden rounded-full bg-primary px-4 py-2 text-primary-foreground sm:flex",
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
