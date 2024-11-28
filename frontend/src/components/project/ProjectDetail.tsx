import { useState } from "react";
import { useParams } from "react-router-dom";
import { mockProjects } from "../../data/mockData";
import ProjectOverview from "./ProjectOverview";
import TaskList from "./TaskList";
import ProjectFiles from "./ProjectFiles";
import ProjectDiscussions from "./ProjectDiscussions";
import TeamSection from "./TeamSection";

type TabType = "Overview" | "Tasks" | "Files" | "Discussions";

export default function ProjectDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>("Overview");
  const project = mockProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">Project not found</h1>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <ProjectOverview project={project} />;
      case "Tasks":
        return <TaskList tasks={project.tasks} />;
      case "Files":
        return <ProjectFiles />;
      case "Discussions":
        return <ProjectDiscussions />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {project.name}
              </h1>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </div>
        </div>

        <div className="border-t px-6 py-4 bg-gray-50 rounded-b-xl">
          <div className="flex gap-4">
            {["Overview", "Tasks", "Files", "Discussions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as TabType)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab
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

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">{renderTabContent()}</div>
        <div className="col-span-12 lg:col-span-4">
          <TeamSection team={project.team} />
        </div>
      </div>
    </div>
  );
}
