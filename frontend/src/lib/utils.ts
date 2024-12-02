import { type ClassValue, clsx } from "clsx";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function handleError(message: string) {
  return toast.error(message, {
    position: "top-center",
  });
}

export function handleSuccess(message: string) {
  return toast.success(message, {
    position: "top-center",
  });
}
