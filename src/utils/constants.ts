export const APP_CONFIG = {
  name: 'SynergySphere',
  version: '1.0.0',
  description: 'Advanced Team Collaboration Platform',
  author: 'SynergySphere Team'
};

export const TASK_STATUSES = [
  { value: 'todo', label: 'To Do', color: 'bg-gray-100 text-gray-800' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { value: 'done', label: 'Done', color: 'bg-green-100 text-green-800' }
] as const;

export const TASK_PRIORITIES = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
] as const;

export const NOTIFICATION_TYPES = [
  'task_assigned',
  'task_due',
  'task_completed',
  'project_invite',
  'comment_added'
] as const;

export const STORAGE_KEYS = {
  APP_STATE: 'synergysphere_app_state',
  USERS: 'synergysphere_users',
  PROJECTS: 'synergysphere_projects',
  TASKS: 'synergysphere_tasks',
  NOTIFICATIONS: 'synergysphere_notifications',
  CURRENT_USER: 'synergysphere_current_user'
} as const;
