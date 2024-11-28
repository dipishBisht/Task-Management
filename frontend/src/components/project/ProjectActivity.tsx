import { MessageSquare, FileText, CheckSquare } from 'lucide-react';

export default function ProjectActivity() {
  const activities = [
    {
      id: 1,
      user: 'Sarah Chen',
      action: 'completed task',
      target: 'Design Homepage',
      time: '2 hours ago',
      icon: CheckSquare,
      color: 'text-green-500',
    },
    {
      id: 2,
      user: 'Mike Johnson',
      action: 'commented on',
      target: 'Implement Frontend',
      time: '4 hours ago',
      icon: MessageSquare,
      color: 'text-blue-500',
    },
    {
      id: 3,
      user: 'Emily Davis',
      action: 'uploaded',
      target: 'Design Assets.zip',
      time: '6 hours ago',
      icon: FileText,
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-4">
              <div className={`${activity.color} mt-1`}>
                <activity.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">
                  <span className="font-medium">{activity.user}</span>{' '}
                  {activity.action}{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}