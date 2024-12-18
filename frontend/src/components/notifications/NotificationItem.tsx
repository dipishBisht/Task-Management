import React from "react";
import { Bell, Mail, MessageSquare, Package, User } from "lucide-react";
import type { Notification, NotificationType } from "../../types/index";

const iconMap: Record<NotificationType, React.FC<{ className?: string }>> = {
  message: MessageSquare,
  alert: Bell,
  email: Mail,
  delivery: Package,
  mention: User,
};

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}

export function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const Icon = iconMap[notification.type];

  return (
    <div
      className={`p-4 transition-colors ${
        notification.read ? "bg-white" : "bg-blue-50"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-full bg-blue-100">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{notification.title}</h3>
          <p className="text-gray-600 mt-1">{notification.message}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">{notification.time}</span>
            {!notification.read && (
              <button
                onClick={() => onRead(notification.id)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
