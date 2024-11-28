import { Plus, Filter } from "lucide-react";
import ProjectTable from "./ProjectTable";
import { mockProjects } from "../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await axios.get("http://localhost:3000/get-projects");
    console.log(response);
    setData(response.data.response);
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
              const response = await axios.post(
                "http://localhost:3000/create-project",
                {
                  projectName: "Website Redesign",
                  status: "In Progress",
                  priority: "High",
                  dueDate: "4/1/2024",
                  owner: "Dipish Bisht",
                }
              );
              console.log(response);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      <ProjectTable projects={data} />
    </div>
  );
}
