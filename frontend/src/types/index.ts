export interface Project {
  _id: string;
  projectName: string;
  status: "In Progress" | "Done" | "Stuck" | "Not Started";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  owner: string;
  description: string;
  team: TeamMember[];
  tasks: Task[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
}

export interface Task {
  id: string;
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

export interface AuthInterface {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  setUser: (user: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (status: boolean) => void;
}
