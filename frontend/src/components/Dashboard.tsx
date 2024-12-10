import { Plus, Filter } from "lucide-react";
import ProjectTable from "./ProjectTable";
import { ToastContainer } from "react-toastify";
import { useProjects } from "../hooks/useProjects";

export default function Dashboard() {
  const { createProject } = useProjects();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button
            onClick={createProject}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      <ProjectTable />
      <ToastContainer />
    </div>
  );
}
