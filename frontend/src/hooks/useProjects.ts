import { useState, useCallback } from 'react';
import { mockProjects } from '@/data/mockData';
import { Project } from '@/types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const addProject = useCallback((project: Project) => {
    setProjects((prev) => [...prev, project]);
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, ...updates } : project
      )
    );
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  }, []);

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
  };
}