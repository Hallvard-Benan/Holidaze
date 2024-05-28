import React from "react";
import { FaUserCircle } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { cn } from "../../utils/utils";

export default function UserDropDown({
  activeRoute,
  activeStyles,
  user,
  handleLogout,
  isLoggedIn,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex flex-col items-center gap-1 text-xs text-muted-foreground sm:flex-row",
          activeRoute === "profiles" && activeStyles,
          !isLoggedIn && "sm:hidden",
        )}
      >
        <div
          className={cn(
            "flex size-8  items-center justify-center rounded-full border border-primary sm:size-[2.8rem]",
          )}
        >
          {user?.avatar?.url ? (
            <img
              className="size-8 rounded-full object-cover sm:size-10"
              src={user?.avatar?.url}
            />
          ) : (
            <FaUserCircle className="size-8 sm:size-10" />
          )}
        </div>
        <p className="sm:hidden ">Profile</p>{" "}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col-reverse gap-1 md:flex-col ">
        {isLoggedIn ? (
          <>
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
              className="flex gap-2 px-8 text-destructive hover:cursor-pointer"
              onClick={handleLogout}
            >
              <p>Logout</p> <FiLogOut />
            </DropdownMenuItem>{" "}
          </>
        ) : (
          <>
            <Link to={`/auth/login`}>
              <DropdownMenuItem className="flex gap-2 px-8 hover:cursor-pointer">
                <p>Log in</p> <FiLogIn />
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link to={"/auth/register"}>
              <DropdownMenuItem
                className="rounded-md bg-primary  px-8  text-primary-foreground hover:cursor-pointer"
                onClick={handleLogout}
              >
                Sign up
              </DropdownMenuItem>{" "}
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
