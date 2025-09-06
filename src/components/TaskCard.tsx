import React from 'react';
import { 
  Calendar, 
  User, 
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  PlayCircle
} from 'lucide-react';
import { Task, User as UserType } from '../types';
import { getRelativeDate, isTaskOverdue } from '../utils/helpers';

interface TaskCardProps {
  task: Task;
  users: UserType[];
  viewMode: 'grid' | 'list';
  onClick: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  users, 
  viewMode, 
  onClick, 
  onUpdate, 
  onDelete 
}) => {
  const assignee = users.find(user => user.id === task.assigneeId);
  const isOverdue = isTaskOverdue(task);

  const handleStatusChange = (newStatus: Task['status']) => {
    onUpdate({ ...task, status: newStatus, updatedAt: new Date() });
  };

  const handlePriorityChange = (newPriority: Task['priority']) => {
    onUpdate({ ...task, priority: newPriority, updatedAt: new Date() });
  };

  // --- Helper for Priority Badge ---
  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">🔴 High</span>;
      case 'medium':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">🟡 Medium</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">🟢 Low</span>;
    }
  };

  // --- Helper for Status Badge ---
  const getStatusBadge = (status: Task['status']) => {
    switch (status) {
      case 'done':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" /> Done</span>;
      case 'in_progress':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"><PlayCircle className="h-3 w-3 mr-1" /> In Progress</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"><Clock className="h-3 w-3 mr-1" /> Todo</span>;
    }
  };

  // --- Avatar (Initials Fallback) ---
  const Avatar = ({ name }: { name: string }) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return (
      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
        {initials}
      </div>
    );
  };

  // --- Due Date Color ---
  const getDueDateColor = () => {
    if (!task.dueDate) return "text-gray-500";
    if (isOverdue) return "text-red-500";
    const due = new Date(task.dueDate).getTime();
    const now = new Date().getTime();
    const diff = due - now;
    if (diff < 1000 * 60 * 60 * 24 * 2) return "text-orange-500"; // < 2 days
    return "text-gray-500";
  };

  // --- List View ---
  if (viewMode === 'list') {
    return (
      <div className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-all flex items-center justify-between group border-l-4 border-transparent hover:border-blue-400">
        
        {/* Title + Description */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <button
            onClick={() => handleStatusChange(task.status === 'done' ? 'todo' : 'done')}
            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              task.status === 'done' 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-gray-300 hover:border-green-500'
            }`}
          >
            {task.status === 'done' && <CheckCircle className="h-3 w-3" />}
          </button>

          <div className="flex-1 min-w-0">
            <button onClick={onClick} className="text-left w-full">
              <h3 className={`text-sm font-medium truncate ${
                task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-xs text-gray-500 truncate mt-1">{task.description}</p>
              )}
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3 ml-4">
          {getStatusBadge(task.status)}
          {getPriorityBadge(task.priority)}

          {assignee && (
            <div className="flex items-center">
              <Avatar name={assignee.name} />
            </div>
          )}

          {task.dueDate && (
            <div className={`flex items-center text-xs ${getDueDateColor()}`}>
              <Calendar className="h-3 w-3 mr-1" />
              {getRelativeDate(task.dueDate)}
              {isOverdue && <AlertCircle className="h-3 w-3 ml-1" />}
            </div>
          )}

          {/* Hover Actions */}
          <div className="hidden group-hover:flex items-center space-x-2">
            <button onClick={() => onUpdate(task)} className="p-1 text-gray-400 hover:text-blue-600">
              <Edit className="h-4 w-4" />
            </button>
            <button onClick={() => onDelete(task.id)} className="p-1 text-gray-400 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Grid View ---
  return (
    <div className={`bg-white shadow rounded-lg p-5 hover:shadow-md transition-all border-l-4 ${
      task.status === 'done' ? 'border-green-500' : task.status === 'in_progress' ? 'border-blue-500' : 'border-gray-300'
    } group`}>
      {/* Title */}
      <div className="flex justify-between items-start mb-3">
        <button onClick={onClick} className="text-left w-full">
          <h3 className={`text-base font-semibold mb-1 ${
            task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
          )}
        </button>
        <div className="hidden group-hover:flex space-x-2">
          <button onClick={() => onUpdate(task)} className="p-1 text-gray-400 hover:text-blue-600">
            <Edit className="h-4 w-4" />
          </button>
          <button onClick={() => onDelete(task.id)} className="p-1 text-gray-400 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center justify-between mb-3">
        {getStatusBadge(task.status)}
        {getPriorityBadge(task.priority)}
      </div>

      {/* Assignee + Due Date */}
      <div className="flex items-center justify-between text-sm">
        {assignee && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Avatar name={assignee.name} />
            <span className="truncate">{assignee.name}</span>
          </div>
        )}
        {task.dueDate && (
          <div className={`flex items-center ${getDueDateColor()}`}>
            <Calendar className="h-4 w-4 mr-1" />
            {getRelativeDate(task.dueDate)}
            {isOverdue && <AlertCircle className="h-4 w-4 ml-1" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
