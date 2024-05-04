import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateIn) {
  const date = new Date(dateIn);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Adding 1 to get the correct month
  const year = date.getFullYear();
  const dateOut = `${day}.${month}.${year}`;
  return dateOut;
}
