import { Project } from "../types";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjectStore } from "../store/project";
import { useAuth } from "../store/auth";

export default function ProjectTable() {
  const { projects } = useProjectStore();
  const {user} = useAuth()
  
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
              <th className="text-left p-4 font-medium text-gray-600">Owner</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, idx) => (
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
                <td className="p-4">{`${user.firstName} ${user.lastName}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
