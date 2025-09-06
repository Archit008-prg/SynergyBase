import { Project, Task, User } from '../types';
import { generateId } from './helpers';

export const createDemoData = () => {
  const demoUsers: User[] = [
    {
      id: '1',
      name: 'Demo User',
      email: 'demo@synergysphere.com',
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      createdAt: new Date('2024-01-02')
    },
    {
      id: '3',
      name: 'Bob Smith',
      email: 'bob@example.com',
      createdAt: new Date('2024-01-03')
    },
    {
      id: '4',
      name: 'Carol Davis',
      email: 'carol@example.com',
      createdAt: new Date('2024-01-04')
    }
  ];

  const demoProjects: Project[] = [
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete redesign of the company website with modern UI/UX',
      ownerId: '1',
      members: ['1', '2', '3'],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Build a cross-platform mobile application for iOS and Android',
      ownerId: '1',
      members: ['1', '2', '4'],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-22')
    },
    {
      id: '3',
      name: 'Marketing Campaign',
      description: 'Launch a comprehensive marketing campaign for Q2 2024',
      ownerId: '1',
      members: ['1', '3', '4'],
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-18')
    }
  ];

  const demoTasks: Task[] = [
    // Website Redesign tasks
    {
      id: '1',
      title: 'Design new homepage layout',
      description: 'Create wireframes and mockups for the new homepage design',
      projectId: '1',
      assigneeId: '2',
      status: 'done',
      priority: 'high',
      dueDate: new Date('2024-01-25'),
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      title: 'Implement responsive navigation',
      description: 'Build responsive navigation component with mobile menu',
      projectId: '1',
      assigneeId: '3',
      status: 'in_progress',
      priority: 'high',
      dueDate: new Date('2024-01-30'),
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-22')
    },
    {
      id: '3',
      title: 'Optimize page loading speed',
      description: 'Implement performance optimizations and lazy loading',
      projectId: '1',
      assigneeId: '2',
      status: 'todo',
      priority: 'medium',
      dueDate: new Date('2024-02-05'),
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18')
    },
    // Mobile App tasks
    {
      id: '4',
      title: 'Set up React Native project',
      description: 'Initialize React Native project with TypeScript and navigation',
      projectId: '2',
      assigneeId: '4',
      status: 'done',
      priority: 'high',
      dueDate: new Date('2024-01-20'),
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-19')
    },
    {
      id: '5',
      title: 'Implement user authentication',
      description: 'Build login and registration screens with API integration',
      projectId: '2',
      assigneeId: '2',
      status: 'in_progress',
      priority: 'high',
      dueDate: new Date('2024-02-01'),
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-21')
    },
    {
      id: '6',
      title: 'Design app icon and splash screen',
      description: 'Create app icon and splash screen assets',
      projectId: '2',
      assigneeId: '4',
      status: 'todo',
      priority: 'low',
      dueDate: new Date('2024-02-10'),
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14')
    },
    // Marketing Campaign tasks
    {
      id: '7',
      title: 'Create social media content calendar',
      description: 'Plan and schedule social media posts for the campaign',
      projectId: '3',
      assigneeId: '3',
      status: 'done',
      priority: 'medium',
      dueDate: new Date('2024-01-15'),
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-14')
    },
    {
      id: '8',
      title: 'Design promotional materials',
      description: 'Create banners, flyers, and digital assets for promotion',
      projectId: '3',
      assigneeId: '4',
      status: 'in_progress',
      priority: 'medium',
      dueDate: new Date('2024-01-28'),
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-21')
    },
    {
      id: '9',
      title: 'Set up analytics tracking',
      description: 'Implement Google Analytics and conversion tracking',
      projectId: '3',
      assigneeId: '3',
      status: 'todo',
      priority: 'low',
      dueDate: new Date('2024-02-15'),
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    }
  ];

  return {
    users: demoUsers,
    projects: demoProjects,
    tasks: demoTasks
  };
};
