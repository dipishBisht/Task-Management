import { create } from "zustand";
import { Project } from "../types";

interface ProjectInterface {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

export const useProjectStore = create<ProjectInterface>((set) => ({
  projects: [],
  setProjects: (projects) => set(() => ({ projects })),
}));
