import { useState, useCallback } from "react";
import { Project } from "../types";
import axios from "axios";
import { DB_PREFIX, handleError, handleSuccess } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();


  const addProject = useCallback((project: Project) => {
    setProjects((prev) => [...prev, project]);
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((project) =>
        project._id === id ? { ...project, ...updates } : project
      )
    );
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((project) => project._id !== id));
  }, []);

  const getProjects = async () => {
    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    try {
      const response = await axios.get(`${DB_PREFIX}/project/get-project`, {
        headers,
      });
      setProjects(response.data.projects);
      return response.data.projects
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const createProject=async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");

      const headers = {
        Authorization: token,
      };

      const response = await axios.post(
        `${DB_PREFIX}/project/create-project`,
        {
          projectName: "Websites manage",
          status: "In Progress",
          priority: "High",
          dueDate: "2024-12-10",
          description: "creating a project of website management",
        },
        { headers }
      );

      // Handle success if status code is 200
      if (response.status === 201) {
        handleSuccess("Project created successfully");
        setTimeout(
          () => navigate("/project/" + response.data.data.owner),
          2000
        );
        getProjects();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        switch (status) {
          case 400:
            // Handle Zod validation errors
            const errorMessages = error.response?.data?.errors?.map(
              (err: any) => `${err.message} ${err.path[0]}`
            ) || ["Validation error occurred"];
            errorMessages.forEach((msg: string) => handleError(msg));
            break;

          case 401:
            // Handle project name already exists
            handleError("Project with this name already exists");
            break;

          default:
            // Handle other unexpected errors
            handleError("An unexpected error occurred");
            break;
        }
        console.error(error);
      } else {
        // Handle unknown errors
        handleError("An unknown error occurred");
        console.error("Unknown error:", error);
      }
    }
  }

  return {
    getProjects,
    createProject,
    projects,
    addProject,
    updateProject,
    deleteProject,
  };
}
