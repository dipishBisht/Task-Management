interface NotificationHeaderProps {
  unreadCount: number;
}

export function NotificationHeader({
  unreadCount,
}: NotificationHeaderProps) {
  return (
    <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
          {unreadCount > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {unreadCount} unread
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
