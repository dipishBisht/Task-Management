import { Plus, Filter } from "lucide-react";
import ProjectTable from "./ProjectTable";
import { useEffect } from "react";
import axios from "axios";
import { useProjectStore } from "../store/project";
import { DB_PREFIX, handleSuccess } from "../lib/utils";
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
  const { setProjects } = useProjectStore();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    try {
      const response = await axios.get(`${DB_PREFIX}/project/get-project`, { headers });
      setProjects(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  }

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
            onClick={async () => {
              try {
                const headers = {
                  Authorization: localStorage.getItem("token"),
                };

                const response = await axios.post(
                  `${DB_PREFIX}/project/create-project`,
                  {
                    projectName: "Websites manage",
                    status: "In Progress",
                    priority: "High",
                    dueDate: "2024-12-05",
                  },
                  { headers }
                );
                if (response.data.success)
                  handleSuccess("Project created successfully");
                console.log(response);
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  console.error("Axios error:", error.response?.data);
                } else {
                  console.error("Unknown error:", error);
                }
              }
            }}
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
