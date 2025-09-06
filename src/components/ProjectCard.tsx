import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { Project, Task } from '../types';
import { getTaskProgress, formatDate } from '../utils/helpers';

interface ProjectCardProps {
  project: Project;
  tasks: Task[];
  viewMode: 'grid' | 'list';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, tasks, viewMode }) => {
  const progress = getTaskProgress(tasks);
  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date() && task.status !== 'done';
  }).length;

  const getStatusColor = () => {
    if (progress.percentage === 100) return 'text-green-600 bg-green-100';
    if (overdueTasks > 0) return 'text-red-600 bg-red-100';
    return 'text-blue-600 bg-blue-100';
  };

  const getStatusText = () => {
    if (progress.percentage === 100) return 'Completed';
    if (overdueTasks > 0) return `${overdueTasks} overdue`;
    return 'In Progress';
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <Link
                to={`/project/${project.id}`}
                className="text-lg font-medium text-gray-900 hover:text-blue-600 truncate"
              >
                {project.name}
              </Link>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500 truncate">{project.description}</p>
            <div className="mt-2 flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {project.members.length} members
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                {progress.completed}/{progress.total} tasks
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(project.updatedAt)}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-500 w-12 text-right">
              {progress.percentage}%
            </span>
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
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <Link
            to={`/project/${project.id}`}
            className="text-lg font-medium text-gray-900 hover:text-blue-600"
          >
            {project.name}
          </Link>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{project.description}</p>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Progress</span>
          <span>{progress.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {project.members.length}
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" />
            {progress.completed}
          </div>
          {overdueTasks > 0 && (
            <div className="flex items-center text-red-500">
              <Clock className="h-4 w-4 mr-1" />
              {overdueTasks}
            </div>
          )}
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Updated {formatDate(project.updatedAt)}</span>
          <Link
            to={`/project/${project.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
