import { Bell } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="p-4 rounded-full bg-gray-100">
        <Bell className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">No notifications yet</h3>
      <p className="mt-2 text-gray-600 text-center max-w-sm">
        When you get notifications, they'll show up here. We'll notify you when something important happens.
      </p>
    </div>
  );
}