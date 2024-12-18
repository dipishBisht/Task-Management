import { NotificationItem } from './NotificationItem';
import { EmptyState } from './EmptyState';
import type { Notification } from "../../types/index";

interface NotificationListProps {
  notifications: Notification[];
  onRead: (id: string) => void;
}

export function NotificationList({ notifications, onRead }: NotificationListProps) {
  if (notifications.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="divide-y divide-gray-200">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRead={onRead}
        />
      ))}
    </div>
  );
}