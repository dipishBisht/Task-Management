import { useEffect } from "react";
import { useNotifications } from "../../hooks/useNotifications";
import { NotificationHeader } from "../../components/notifications/NotificationHeader";
import { NotificationList } from "../../components/notifications/NotificationList";

export default function Notification() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    setHasViewedPage,
  } = useNotifications();

  useEffect(() => {
    setHasViewedPage(true);
  }, [setHasViewedPage]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <NotificationHeader
            unreadCount={unreadCount}
          />
          <NotificationList notifications={notifications} onRead={markAsRead} />
        </div>
      </div>
    </div>
  );
}
