import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  CheckCircle,
  Clock,
  MoreVertical,
  Check,
  Hourglass,
  AlertTriangle,
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
  const overdueTasks = tasks.filter(
    (task) => task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "done"
  ).length;

  const getStatusStyle = () => {
    if (progress.percentage === 100)
      return { border: "border-l-4 border-green-500", chip: "bg-green-100 text-green-700", icon: <Check className="h-3 w-3 mr-1" /> };
    if (overdueTasks > 0)
      return { border: "border-l-4 border-red-500", chip: "bg-red-100 text-red-700", icon: <AlertTriangle className="h-3 w-3 mr-1" /> };
    return { border: "border-l-4 border-blue-500", chip: "bg-blue-100 text-blue-700", icon: <Hourglass className="h-3 w-3 mr-1" /> };
  };

  const statusStyle = getStatusStyle();
  const getStatusText = () => {
    if (progress.percentage === 100) return "Completed";
    if (overdueTasks > 0) return `${overdueTasks} Overdue`;
    return "In Progress";
  };

  const cardBase =
    `relative bg-white rounded-2xl shadow-md p-6 border border-gray-100 
    hover:shadow-xl hover:scale-[1.01] transition-all duration-300 ${statusStyle.border}`;

  // ---------------- LIST VIEW ----------------
  if (viewMode === "list") {
    return (
      <div className={cardBase}>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3">
              <Link
                to={`/project/${project.id}`}
                className="text-lg font-semibold tracking-tight text-gray-900 hover:text-blue-600 truncate"
              >
                {project.name}
              </Link>
              <span
                className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${statusStyle.chip}`}
              >
                {statusStyle.icon}
                {getStatusText()}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 truncate">{project.description}</p>

            <div className="mt-3 flex items-center space-x-4 text-sm">
              <span className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                <Users className="h-4 w-4 mr-1 text-gray-400" />
                {project.members.length}
              </span>
              <span className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                {progress.completed}/{progress.total}
              </span>
              <span className="flex items-center text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(project.updatedAt)}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600">
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

  // ---------------- GRID VIEW ----------------
  return (
    <div className={cardBase}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <Link
            to={`/project/${project.id}`}
            className="text-lg font-semibold tracking-tight text-gray-900 hover:text-blue-600"
          >
            {project.name}
          </Link>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{project.description}</p>
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
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          <span className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
            <Users className="h-4 w-4 mr-1 text-gray-400" />
            {project.members.length}
          </span>
          <span className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
            {progress.completed}
          </span>
          {overdueTasks > 0 && (
            <span className="flex items-center bg-red-50 text-red-600 px-2 py-1 rounded-full font-medium">
              <Clock className="h-4 w-4 mr-1" />
              {overdueTasks}
            </span>
          )}
        </div>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.chip}`}
        >
          {statusStyle.icon}
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
