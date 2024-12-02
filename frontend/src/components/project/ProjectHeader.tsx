import { Project } from "../../types";
import { Calendar, Users, MoreVertical, Star, Share2 } from "lucide-react";
import { format } from "date-fns";

interface ProjectHeaderProps {
  project: Project;
}

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {project.projectName}
              </h1>
              <button className="text-gray-400 hover:text-yellow-500">
                <Star className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-lg">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Due {format(new Date(project.dueDate), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{project.team.length} team members</span>
          </div>
        </div>
      </div>

      <div className="border-t px-6 py-4 bg-gray-50 rounded-b-xl">
        <div className="flex gap-4">
          {["Overview", "Tasks", "Files", "Discussions"].map((tab) => (
            <button
              key={tab}
              className={`px-3 py-2 text-sm font-medium rounded-lg ${
                tab === "Tasks"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-white/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
