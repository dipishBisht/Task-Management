import { useState, useEffect } from "react";
import { type Notification } from "../types/index";
import { mockNotifications } from "../data/mockData";

export function useNotifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [hasViewedPage, setHasViewedPage] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (hasViewedPage) {
      const timeoutId = setTimeout(() => {
        setNotifications((currentNotifications) =>
          currentNotifications.map((notification) => ({
            ...notification,
            read: true,
          }))
        );
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [hasViewedPage]);

  const markAsRead = (id: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    setHasViewedPage,
  };
}
