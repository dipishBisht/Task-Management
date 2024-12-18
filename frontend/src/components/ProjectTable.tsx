import { Project } from "../types";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProjectStore, useSearchProjectStore } from "../store/project";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
import { DB_PREFIX, handleError, handleSuccess } from "../lib/utils";

export default function ProjectTable() {
  const { projects, fetchProjects } = useProjectStore();
  const { searchProject } = useSearchProjectStore();
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isFormOpen, setIsFormOpen] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    projectName: "",
    status: "",
    priority: "",
    dueDate: "",
    description: "",
  });

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    if (searchProject === "") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project: any) =>
          project.projectName
            .toLowerCase()
            .includes(searchProject.toLowerCase())
        )
      );
    }
  }, [searchProject, projects]);

  const handleEditClick = (project: any) => {
    setIsFormOpen(project._id);
    setFormData({
      projectName: project.projectName,
      status: project.status,
      priority: project.priority,
      dueDate: new Date(project.dueDate).toLocaleDateString(),
      description: project.description,
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");
      const headers = {
        Authorization: token,
      };
      const response = await axios.put(
        `${DB_PREFIX}/project/edit-basic-details`,
        formData,
        { headers }
      );

      if (response.status === 201) {
        handleSuccess("Data updated successfully");
        setIsFormOpen(null);
        fetchProjects();
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
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-medium text-gray-600">
                Project Name
              </th>
              <th className="text-left p-4 font-medium text-gray-600">
                Status
              </th>
              <th className="text-left p-4 font-medium text-gray-600">
                Priority
              </th>
              <th className="text-left p-4 font-medium text-gray-600">
                Due Date
              </th>
              <th className="text-left p-4 font-medium text-gray-600">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project: any, idx: number) => (
              <tr key={"project-" + idx} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <Link
                    to={`/project/${project["_id"]}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {project.projectName}
                  </Link>
                </td>
                <td className="p-4">
                  <StatusBadge status={project.status} />
                </td>
                <td className="p-4">
                  <PriorityBadge priority={project.priority} />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(project.dueDate).toLocaleDateString()}
                  </div>
                </td>
                <td
                  className="p-4 cursor-pointer"
                  onClick={() => handleEditClick(project)}
                >
                  <BiEdit fontSize={24} color="#333" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {isFormOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Project Name
                </label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Priority
                </label>
                <input
                  type="text"
                  name="priority"
                  value={formData.priority}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Description
                </label>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                ></input>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const colors = {
    "In Progress": "bg-blue-100 text-blue-800",
    Done: "bg-green-100 text-green-800",
    Stuck: "bg-red-100 text-red-800",
    "Not Started": "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Project["priority"] }) {
  const colors = {
    Low: "bg-gray-100 text-gray-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[priority]}`}
    >
      {priority}
    </span>
  );
}
