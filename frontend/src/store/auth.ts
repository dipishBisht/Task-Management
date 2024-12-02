import { create } from "zustand";
import { AuthInterface} from "../types";

export const useAuth = create<AuthInterface>((set) => ({
  user: { firstName: "", lastName: "", email: "" },
  setUser: (user) => set({ user }),
  isUserLoggedIn: false,
  setIsUserLoggedIn: (status) => set({ isUserLoggedIn: status }),
}));
