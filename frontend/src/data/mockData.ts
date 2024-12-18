import { Notification, TeamMember } from "../types";

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Product Manager",
    email: "sarah@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    name: "Mike Johnson",
    role: "Developer",
    email: "mike@example.com",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    name: "Emily Davis",
    role: "Designer",
    email: "emily@example.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

export const mockProjects: Project[] = [
  {
    _id: "1",
    projectName: "Website Redesign",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-04-01",
    owner: "Sarah Chen",
    description:
      "Complete overhaul of company website with modern design and improved UX",
    team: [teamMembers[0], teamMembers[1], teamMembers[2]],
    tasks: [
      {
        id: "1",
        title: "Design Homepage",
        status: "Done",
        assignee: "Emily Davis",
        dueDate: "2024-03-15",
      },
      {
        id: "2",
        title: "Implement Frontend",
        status: "In Progress",
        assignee: "Mike Johnson",
        dueDate: "2024-03-25",
      },
    ],
  },
  {
    _id: "2",
    projectName: "Mobile App Development",
    status: "Not Started",
    priority: "Medium",
    dueDate: "2024-05-15",
    owner: "Mike Johnson",
    description: "Create a new mobile app for customer engagement",
    team: [teamMembers[1], teamMembers[2]],
    tasks: [
      {
        id: "3",
        title: "App Wireframes",
        status: "To Do",
        assignee: "Emily Davis",
        dueDate: "2024-04-01",
      },
    ],
  },
  {
    _id: "3",
    projectName: "Marketing Campaign",
    status: "Done",
    priority: "Low",
    dueDate: "2024-03-20",
    owner: "Emily Davis",
    description: "Q1 Marketing Campaign for product launch",
    team: [teamMembers[0], teamMembers[2]],
    tasks: [
      {
        id: "4",
        title: "Social Media Strategy",
        status: "Done",
        assignee: "Sarah Chen",
        dueDate: "2024-03-10",
      },
    ],
  },
];


export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New Message from Sarah',
    message: 'Hey! Just checking in about the project progress...',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'alert',
    title: 'System Update',
    message: 'Your account security settings were updated',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'email',
    title: 'New Email Newsletter',
    message: 'Check out our latest features and updates!',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'delivery',
    title: 'Package Delivered',
    message: 'Your order #12345 has been delivered',
    time: '1 day ago',
    read: true,
  },
  {
    id: '5',
    type: 'mention',
    title: 'You were mentioned',
    message: '@alex mentioned you in the design team chat',
    time: '2 days ago',
    read: true,
  },
];