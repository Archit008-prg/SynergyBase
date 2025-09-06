import { format, isToday, isTomorrow, isPast, isFuture } from 'date-fns';
import { Task, TaskStatus, TaskPriority } from '../types';

export const formatDate = (date: Date): string => {
  if (!date || isNaN(date.getTime())) {
    return 'Invalid date';
  }
  return format(date, 'MMM dd, yyyy');
};

export const formatDateTime = (date: Date): string => {
  if (!date || isNaN(date.getTime())) {
    return 'Invalid date';
  }
  return format(date, 'MMM dd, yyyy HH:mm');
};

export const getRelativeDate = (date: Date): string => {
  if (!date || isNaN(date.getTime())) {
    return 'Invalid date';
  }
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isPast(date)) return 'Overdue';
  return formatDate(date);
};

export const getTaskStatusColor = (status: TaskStatus): string => {
  switch (status) {
    case 'todo':
      return 'bg-gray-100 text-gray-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'done':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getTaskPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'low':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'high':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const isTaskOverdue = (task: Task): boolean => {
  if (!task.dueDate || isNaN(task.dueDate.getTime())) return false;
  return isPast(task.dueDate) && task.status !== 'done';
};

export const getTaskProgress = (tasks: Task[]): { completed: number; total: number; percentage: number } => {
  const completed = tasks.filter(task => task.status === 'done').length;
  const total = tasks.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { completed, total, percentage };
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
