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
import { TfiMenu } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { LuUser2 } from "react-icons/lu";
import Search from "../ui/search";
import { cn } from "../../utils/utils";

export default function NavBar() {
  const isLoggedIn = useBoundStore((state) => state.isLoggedIn);
  const logout = useBoundStore((state) => state.logout);
  const user = useBoundStore((state) => state.user);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.search.value;
    navigate(`/venues?search=${searchTerm}`);
  };

  return (
    <nav className=" mx-auto flex w-calc items-center justify-between px-4 py-2 text-xl">
      <NavLink
        className={cn(
          ({ isActive }) => (isActive ? "font-bold " : "", "bg-primary"),
        )}
        to={"/"}
      >
        Home
      </NavLink>

      {user.venueManager && <NavLink to={"/new-venue"}>New venue</NavLink>}

      <div className="flex items-center gap-2">
        {/* <Search onSearch={handleSearch} /> */}
        {isLoggedIn ? (
          <>
            <NavLink to={`/profiles/${user.name}`}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  data-cy="open-menu-button"
                  className="flex items-center gap-1 text-2xl"
                >
                  <TfiMenu className="" />
                  <img
                    className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
                    src={
                      status === "success"
                        ? data.data.data.avatar.url
                        : user.avatar.url
                    }
                  />
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
                    onClick={logout}
                  >
                    Logout <FiLogOut />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavLink>
          </>
        ) : (
          <>
            {" "}
            <NavLink
              className={cn(
                ({ isActive }) => (isActive ? "underline" : "", "bg-primary"),
                "text-primary-foreground rounded-md bg-primary px-4 py-2",
              )}
              to={"/auth/login"}
            >
              Login
            </NavLink>
            <NavLink
              className={cn(
                ({ isActive }) => (isActive ? "font-bold" : "", "bg-primary"),
                "text-primary-foreground rounded-md bg-primary px-4 py-2",
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
