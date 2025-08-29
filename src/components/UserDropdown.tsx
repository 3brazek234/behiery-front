"use client";

import React from "react";
import Link from "next/link";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUserStore from "@/store/user";

const UserDropdown: React.FC = () => {
  const { user, logout } = useUserStore();

  if (!user) return null;

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none transition duration-150">
          <span className="text-sm font-medium truncate !w-30">
            {user.name?.split(" ")[0]}
          </span>
          <User className="h-6 w-6 text-gray-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <p className="text-sm font-semibold text-gray-800 truncate">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile">الملف الشخصي</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={logout}
          className="text-red-600 focus:text-red-600"
        >
          تسجيل خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
