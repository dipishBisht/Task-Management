import { mockProjects } from '../data/mockData';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

export default function Timeline() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Project Timeline</h1>
      
      <div className="space-y-8">
        {mockProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(project.dueDate), 'MMM d, yyyy')}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {project.tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    task.status === 'Done' ? 'bg-green-500' :
                    task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-600">Assigned to {task.assignee}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {format(new Date(task.dueDate), 'MMM d')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}