import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateIn) {
  const date = new Date(dateIn);
  let day = date.getDate();
  let month = date.getMonth() + 1; // Adding 1 to get the correct month
  const year = date.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  const dateOut = `${day}.${month}.${year}`;
  return dateOut;
}
