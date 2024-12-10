import { Task } from '../../types';
import { Plus, Clock, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  onAddTask?: () => void;
}

export default function TaskList({ tasks, onAddTask }: TaskListProps) {
  const columns = ['To Do', 'In Progress', 'Done'];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To Do': return 'bg-gray-100';
      case 'In Progress': return 'bg-blue-50';
      case 'Done': return 'bg-green-50';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <button
            onClick={onAddTask}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div key={column} className={`${getStatusColor(column)} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">{column}</h3>
                <span className="text-sm text-gray-600">
                  {tasks.filter((task) => task.status === column).length} tasks
                </span>
              </div>
              <div className="space-y-3">
                {tasks
                  .filter((task) => task.status === column)
                  .map((task) => (
                    <div
                      key={task._id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://ui-avatars.com/api/?name=${task.assignee}&background=random`}
                            alt={task.assignee}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-gray-600">{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          {format(new Date(task.dueDate), 'MMM d')}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}