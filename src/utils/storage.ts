import { AppState, User, Project, Task, Notification } from '../types';
import { createDemoData } from './demoData';

const STORAGE_KEYS = {
  APP_STATE: 'synergysphere_app_state',
  USERS: 'synergysphere_users',
  PROJECTS: 'synergysphere_projects',
  TASKS: 'synergysphere_tasks',
  NOTIFICATIONS: 'synergysphere_notifications',
  CURRENT_USER: 'synergysphere_current_user'
};

export const storage = {
  // Get data from localStorage
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  // Set data to localStorage
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },

  // Remove data from localStorage
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  // Clear all app data
  clear: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};

// Initialize default data if not exists
export const initializeDefaultData = (): void => {
  const users = storage.get<User[]>(STORAGE_KEYS.USERS);
  if (!users) {
    const { users: demoUsers } = createDemoData();
    storage.set(STORAGE_KEYS.USERS, demoUsers);
  }

  const projects = storage.get<Project[]>(STORAGE_KEYS.PROJECTS);
  if (!projects) {
    const { projects: demoProjects } = createDemoData();
    storage.set(STORAGE_KEYS.PROJECTS, demoProjects);
  }

  const tasks = storage.get<Task[]>(STORAGE_KEYS.TASKS);
  if (!tasks) {
    const { tasks: demoTasks } = createDemoData();
    storage.set(STORAGE_KEYS.TASKS, demoTasks);
  }

  const notifications = storage.get<Notification[]>(STORAGE_KEYS.NOTIFICATIONS);
  if (!notifications) {
    storage.set(STORAGE_KEYS.NOTIFICATIONS, []);
  }
};

// Data access functions
export const getUsers = (): User[] => {
  const users = storage.get<User[]>(STORAGE_KEYS.USERS) || [];
  return users.map(user => ({
    ...user,
    createdAt: new Date(user.createdAt)
  }));
};

export const getProjects = (): Project[] => {
  const projects = storage.get<Project[]>(STORAGE_KEYS.PROJECTS) || [];
  return projects.map(project => ({
    ...project,
    createdAt: new Date(project.createdAt),
    updatedAt: new Date(project.updatedAt)
  }));
};

export const getTasks = (): Task[] => {
  const tasks = storage.get<Task[]>(STORAGE_KEYS.TASKS) || [];
  return tasks.map(task => ({
    ...task,
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
    dueDate: task.dueDate ? new Date(task.dueDate) : null
  }));
};

export const getNotifications = (): Notification[] => {
  const notifications = storage.get<Notification[]>(STORAGE_KEYS.NOTIFICATIONS) || [];
  return notifications.map(notification => ({
    ...notification,
    createdAt: new Date(notification.createdAt)
  }));
};

export const getCurrentUser = (): User | null => {
  const user = storage.get<User>(STORAGE_KEYS.CURRENT_USER);
  return user ? {
    ...user,
    createdAt: new Date(user.createdAt)
  } : null;
};

export const saveUsers = (users: User[]): void => storage.set(STORAGE_KEYS.USERS, users);
export const saveProjects = (projects: Project[]): void => storage.set(STORAGE_KEYS.PROJECTS, projects);
export const saveTasks = (tasks: Task[]): void => storage.set(STORAGE_KEYS.TASKS, tasks);
export const saveNotifications = (notifications: Notification[]): void => storage.set(STORAGE_KEYS.NOTIFICATIONS, notifications);
export const saveCurrentUser = (user: User | null): void => storage.set(STORAGE_KEYS.CURRENT_USER, user);
