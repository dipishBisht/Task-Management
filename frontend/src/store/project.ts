import { create } from "zustand";
import axios from "axios";
import { DB_PREFIX } from "../lib/utils";

export const useProjectStore = create<any>((set) => ({
  projects: [],
  fetchProjects: async () => {
    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    try {
      const response = await axios.get(`${DB_PREFIX}/project/get-project`, {
        headers,
      });
      set({ projects: response.data.projects });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  },
}));

export const useSearchProjectStore = create<any>((set) => ({
  searchProject: "",
  setSearchProject: (value: string) => set({ searchProject: value }),
}));
