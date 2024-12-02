import { create } from "zustand";
import { AuthInterface, AuthPage } from "../types";

export const useAuthPage = create<AuthPage>((set) => ({
  currentPage: "login",
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export const useAuth = create<AuthInterface>((set) => ({
  user: { firstName: "", lastName: "", email: "" },
  setUser: (user) => set({ user }),
  isUserLoggedIn: false,
  setIsUserLoggedIn: (status) => set({ isUserLoggedIn: status }),
}));
