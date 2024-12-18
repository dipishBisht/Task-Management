export interface Project {
  _id: string;
  projectName: string;
  status: "In Progress" | "Done" | "Stuck" | "Not Started";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  owner: string;
  createdAt?: String;
  updatedAt?: String;
  _v?: String;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  status: "To Do" | "In Progress" | "Done";
  assignee: string;
  dueDate: string;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export interface AuthPage {
  currentPage: "login" | "signup";
  setCurrentPage: (page: "login" | "signup") => void;
}

export type NotificationType =
  | "message"
  | "alert"
  | "email"
  | "delivery"
  | "mention";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}
