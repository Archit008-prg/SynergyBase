import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  MoreVertical,
} from "lucide-react";
import { Project, Task } from "../types";
import { getTaskProgress, formatDate } from "../utils/helpers";

interface ProjectCardProps {
  project: Project;
  tasks: Task[];
  viewMode: "grid" | "list";
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, tasks, viewMode }) => {
  const progress = getTaskProgress(tasks);
  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate) < new Date() && task.status !== "done";
  }).length;

  const getStatusColor = () => {
    if (progress.percentage === 100) return "bg-green-100 text-green-700";
    if (overdueTasks > 0) return "bg-red-100 text-red-700";
    return "bg-blue-100 text-blue-700";
  };

  const getStatusText = () => {
    if (progress.percentage === 100) return "✅ Completed";
    if (overdueTasks > 0) return `${overdueTasks} overdue ⚠️`;
    return "In Progress";
  };

  // Shared card container
  const cardBase =
    "bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300";

  if (viewMode === "list") {
    return (
      <div className={cardBase}>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <Link
                to={`/project/${project.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 truncate"
              >
                {project.name}
              </Link>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}
              >
                {getStatusText()}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500 truncate">
              {project.description}
            </p>

            <div className="mt-3 flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-gray-400" />
                {project.members.length} members
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                {progress.completed}/{progress.total} tasks
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                {formatDate(project.updatedAt)}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600 w-12 text-right">
              {progress.percentage}%
            </span>
            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid card
  return (
    <div className={cardBase}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <Link
            to={`/project/${project.id}`}
            className="text-lg font-semibold text-gray-900 hover:text-blue-600"
          >
            {project.name}
          </Link>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {project.description}
          </p>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
          <span>Progress</span>
          <span className="font-medium text-gray-700">{progress.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-gray-400" />
            {project.members.length}
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
            {progress.completed}
          </div>
          {overdueTasks > 0 && (
            <div className="flex items-center text-red-500 font-medium">
              <Clock className="h-4 w-4 mr-1" />
              {overdueTasks}
            </div>
          )}
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}
        >
          {getStatusText()}
        </span>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-200">
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
