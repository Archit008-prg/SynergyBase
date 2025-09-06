import React from 'react';
import { 
  Calendar, 
  User, 
  Flag, 
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Task, User as UserType } from '../types';
import { getTaskStatusColor, getTaskPriorityColor, getRelativeDate, isTaskOverdue } from '../utils/helpers';

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

  if (viewMode === 'list') {
    return (
      <div className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleStatusChange(task.status === 'done' ? 'todo' : 'done')}
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  task.status === 'done' 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'border-gray-300 hover:border-green-500'
                }`}
              >
                {task.status === 'done' && <CheckCircle className="h-3 w-3" />}
              </button>
              
              <div className="flex-1 min-w-0">
                <button
                  onClick={onClick}
                  className="text-left w-full"
                >
                  <h3 className={`text-sm font-medium truncate ${
                    task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-900'
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {task.description}
                  </p>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                {task.status.replace('_', ' ')}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTaskPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              {assignee && (
                <div className="flex items-center">
                  <User className="h-3 w-3 mr-1" />
                  {assignee.name}
                </div>
              )}
              {task.dueDate && (
                <div className={`flex items-center ${isOverdue ? 'text-red-500' : ''}`}>
                  <Calendar className="h-3 w-3 mr-1" />
                  {getRelativeDate(task.dueDate)}
                </div>
              )}
            </div>
            
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <button
            onClick={onClick}
            className="text-left w-full"
          >
            <h3 className={`text-lg font-medium mb-2 ${
              task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {task.description}
            </p>
          </button>
        </div>
        
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
            {task.status.replace('_', ' ')}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTaskPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        {assignee && (
          <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-2" />
            <span className="truncate">{assignee.name}</span>
          </div>
        )}

        {task.dueDate && (
          <div className={`flex items-center text-sm ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
            <Calendar className="h-4 w-4 mr-2" />
            <span>{getRelativeDate(task.dueDate)}</span>
            {isOverdue && <AlertCircle className="h-4 w-4 ml-2" />}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={() => handleStatusChange(task.status === 'todo' ? 'in_progress' : 'todo')}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              {task.status === 'todo' ? 'Start' : 'Reset'}
            </button>
            <button
              onClick={() => handleStatusChange('done')}
              className="text-xs text-green-600 hover:text-green-700"
            >
              Complete
            </button>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => handlePriorityChange('low')}
              className={`w-2 h-2 rounded-full ${task.priority === 'low' ? 'bg-green-500' : 'bg-gray-300'}`}
            />
            <button
              onClick={() => handlePriorityChange('medium')}
              className={`w-2 h-2 rounded-full ${task.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-300'}`}
            />
            <button
              onClick={() => handlePriorityChange('high')}
              className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' : 'bg-gray-300'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
