import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";

// Define the type for individual list items
type DropdownMenuDemoListProps = {
  text: string;
  path: string;
  cb?: () => void;
};

// Define the type for the component props
type DropdownMenuDemoProps = {
  list: DropdownMenuDemoListProps[];
  trigger: React.ReactNode | React.JSX.Element;
};

// The DropdownMenuDemo component
export function DropdownMenuDemo({ list, trigger }: DropdownMenuDemoProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {list.map((item, index) => (
            <DropdownMenuItem key={index}>
              <Link
                href={item.path}
                className="w-full"
                onClick={(e) => {
                  if (item.cb) {
                    e.preventDefault(); // Prevent default navigation if callback exists
                    item.cb();
                  }
                }}
              >
                {item.text}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
