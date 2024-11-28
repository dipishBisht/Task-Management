import { Project } from '../../types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface ProjectStatsProps {
  project: Project;
}

export default function ProjectStats({ project }: ProjectStatsProps) {
  const stats = [
    {
      label: 'Completed Tasks',
      value: project.tasks.filter((t) => t.status === 'Done').length,
      total: project.tasks.length,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'In Progress',
      value: project.tasks.filter((t) => t.status === 'In Progress').length,
      total: project.tasks.length,
      icon: Clock,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'To Do',
      value: project.tasks.filter((t) => t.status === 'To Do').length,
      total: project.tasks.length,
      icon: AlertCircle,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-medium">{stat.label}</span>
            <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`${stat.color.replace('text', 'bg')} h-2 rounded-full`}
                style={{ width: `${(stat.value / stat.total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}