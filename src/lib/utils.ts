import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return "bg-green-500 text-white";
    case "inactive":
      return "bg-gray-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}
