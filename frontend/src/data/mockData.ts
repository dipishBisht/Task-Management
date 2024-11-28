import { Project, TeamMember } from '../types';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Product Manager',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Mike Johnson',
    role: 'Developer',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'Designer',
    email: 'emily@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2024-04-01',
    owner: 'Sarah Chen',
    description: 'Complete overhaul of company website with modern design and improved UX',
    team: [teamMembers[0], teamMembers[1], teamMembers[2]],
    tasks: [
      {
        id: '1',
        title: 'Design Homepage',
        status: 'Done',
        assignee: 'Emily Davis',
        dueDate: '2024-03-15'
      },
      {
        id: '2',
        title: 'Implement Frontend',
        status: 'In Progress',
        assignee: 'Mike Johnson',
        dueDate: '2024-03-25'
      }
    ]
  },
  {
    id: '2',
    name: 'Mobile App Development',
    status: 'Not Started',
    priority: 'Medium',
    dueDate: '2024-05-15',
    owner: 'Mike Johnson',
    description: 'Create a new mobile app for customer engagement',
    team: [teamMembers[1], teamMembers[2]],
    tasks: [
      {
        id: '3',
        title: 'App Wireframes',
        status: 'To Do',
        assignee: 'Emily Davis',
        dueDate: '2024-04-01'
      }
    ]
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    status: 'Done',
    priority: 'Low',
    dueDate: '2024-03-20',
    owner: 'Emily Davis',
    description: 'Q1 Marketing Campaign for product launch',
    team: [teamMembers[0], teamMembers[2]],
    tasks: [
      {
        id: '4',
        title: 'Social Media Strategy',
        status: 'Done',
        assignee: 'Sarah Chen',
        dueDate: '2024-03-10'
      }
    ]
  }
];