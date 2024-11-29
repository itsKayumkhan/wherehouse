"use client";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import React, { useState } from "react";
// import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { DropdownMenuDemo } from "./DropDownMenu";

type DropdownMenuProps = {
  text: string;
  path: string;
  cb?: () => void;
};

const Navbar = () => {
  const { token, getData } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    getData();
    router.push("/login");
  };

  const navLinks = [,];

  const dropDownListNonUser: DropdownMenuProps[] = [
    {
      text: "Log in",
      path: "/login",
    },
    {
      text: "Sign up",
      path: "/signup",
    },
  ];

  const dropDownListForUser: DropdownMenuProps[] = [
    { text: "Profile", path: "/profile" },
    { text: "Log Out", path: "/login", cb: handleLogOut },
  ];

  return (
    <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-4 z-10">
      <h1 className="text-2xl font-bold cursor-pointer">
        <Link href="/">
          <i className="ri-store-2-line"></i> My Store
        </Link>
      </h1>

      {/* Mobile menu toggle */}
      <div className="md:hidden flex items-center justify-center gap-3">
        <button
          className="md:hidden  inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 text-xl font-bold"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {token &&
            (isMobileMenuOpen ? (
              <i className="ri-close-line"></i>
            ) : (
              <i className="ri-bar-chart-horizontal-line  "></i>
            ))}
        </button>
        <div className="md:hidden text-3xl">
          {token ? (
            <DropdownMenuDemo
              list={dropDownListForUser}
              trigger={<i className="ri-user-line"></i>}
            />
          ) : (
            <DropdownMenuDemo
              list={dropDownListNonUser}
              trigger={<i className="ri-user-line"></i>}
            />
          )}
        </div>
      </div>

      {/* Authentication Buttons */}
      <div className="hidden md:flex space-x-4">
        {!token ? (
          <>
            <DropdownMenuDemo
              list={dropDownListNonUser}
              trigger={<i className="ri-user-line"></i>}
            />
          </>
        ) : (
          <>
            <DropdownMenuDemo
              list={dropDownListForUser}
              trigger={<i className="ri-user-line"></i>}
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
