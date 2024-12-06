'use client'
import { useState } from "react";
import Link from "next/link";
import {
  Users,
  FolderTree,
  ShoppingBag,
  LayoutDashboard,
  BarChart,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/charts", icon: BarChart, label: "Charts" },
  { href: "/dashboard/users", icon: Users, label: "Users" },
  { href: "/dashboard/categories", icon: FolderTree, label: "Categories" },
  { href: "/dashboard/products", icon: ShoppingBag, label: "Products" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>

    <div className="w-full">
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-20  p-2 rounded shadow   transition"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
 {/* <div className="absolute inset-0 -z-10 h-full w-full   bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" /></div> */}

      <div
        className={`fixed top-0 left-0 z-10 h-screen w-64   p-4 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 transition-colors duration-200"
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-5 md:hidden"
        ></div>
      )}
    </div></>
  );
}
