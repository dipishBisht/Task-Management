export interface Project {
  id: string;
  projectName: string;
  status: 'In Progress' | 'Done' | 'Stuck' | 'Not Started';
  priority: 'Low' | 'Medium' | 'High';
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
  status: 'To Do' | 'In Progress' | 'Done';
  assignee: string;
  dueDate: string;
}