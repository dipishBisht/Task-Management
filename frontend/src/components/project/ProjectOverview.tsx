import { Calendar, Flag, Clock } from "lucide-react";
import { useProjectStore } from "../../store/project";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProjectOverview() {
  const { projects, fetchProjects } = useProjectStore();
  useEffect(() => {
    fetchProjects();
  }, []);
  const { id } = useParams();

  const project = projects.find((project: any) => project._id === id);

  const details = [
    {
      label: "Due Date",
      value: new Date(project.dueDate).toLocaleDateString("en-US"),
      icon: Calendar,
    },
    {
      label: "Priority",
      value: project.priority,
      icon: Flag,
    },
    // {
    //   label: 'Team Size',
    //   value: `${projects.team.length} members`,
    //   icon: Users,
    // },
    {
      label: "Status",
      value: project.status,
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Project Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {details.map((detail: any) => (
            <div key={detail.label} className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <detail.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{detail.label}</p>
                <p className="font-medium">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Description</h2>
        <p className="text-gray-600 whitespace-pre-wrap">
          {project.description}
        </p>
      </div>
    </div>
  );
}
