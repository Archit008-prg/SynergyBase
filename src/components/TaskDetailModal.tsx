import React, { useState } from 'react';
import { X, User, Calendar, Flag, Edit, Trash2, Save, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Task, User as UserType } from '../types';
import { getTaskStatusColor, getTaskPriorityColor, getRelativeDate, isTaskOverdue } from '../utils/helpers';

interface TaskDetailModalProps {
  task: Task;
  users: UserType[];
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ 
  task, 
  users, 
  onClose, 
  onUpdate, 
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    assigneeId: task.assigneeId || '',
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : ''
  });

  const assignee = users.find(user => user.id === task.assigneeId);
  const isOverdue = isTaskOverdue(task);

  const handleSave = () => {
    const updatedTask: Task = {
      ...task,
      title: editData.title,
      description: editData.description,
      assigneeId: editData.assigneeId || null,
      status: editData.status,
      priority: editData.priority,
      dueDate: editData.dueDate ? new Date(editData.dueDate) : null,
      updatedAt: new Date()
    };
    
    onUpdate(updatedTask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
      onClose();
    }
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    if (isEditing) {
      setEditData(prev => ({ ...prev, status: newStatus }));
    } else {
      onUpdate({ ...task, status: newStatus, updatedAt: new Date() });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Task Details
                  </h3>
                  <div className="flex items-center space-x-2">
                    {!isEditing ? (
                      <>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleDelete}
                          className="p-2 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleSave}
                        className="p-2 text-green-600 hover:text-green-700"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={onClose}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                        className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="text-lg font-medium text-gray-900">{task.title}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    {isEditing ? (
                      <textarea
                        rows={4}
                        value={editData.description}
                        onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                        className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{task.description}</p>
                    )}
                  </div>

                  {/* Status and Priority */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      {isEditing ? (
                        <select
                          value={editData.status}
                          onChange={(e) => setEditData(prev => ({ ...prev, status: e.target.value as Task['status'] }))}
                          className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="todo">To Do</option>
                          <option value="in_progress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleStatusChange('todo')}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getTaskStatusColor('todo')} ${
                              task.status === 'todo' ? 'ring-2 ring-blue-500' : ''
                            }`}
                          >
                            To Do
                          </button>
                          <button
                            onClick={() => handleStatusChange('in_progress')}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getTaskStatusColor('in_progress')} ${
                              task.status === 'in_progress' ? 'ring-2 ring-blue-500' : ''
                            }`}
                          >
                            In Progress
                          </button>
                          <button
                            onClick={() => handleStatusChange('done')}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getTaskStatusColor('done')} ${
                              task.status === 'done' ? 'ring-2 ring-blue-500' : ''
                            }`}
                          >
                            Done
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                      </label>
                      {isEditing ? (
                        <select
                          value={editData.priority}
                          onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                          className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onUpdate({ ...task, priority: 'low', updatedAt: new Date() })}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getTaskPriorityColor('low')} ${
                              task.priority === 'low' ? 'ring-2 ring-blue-500' : ''
                            }`}
                          >
                            Low
                          </button>
                          <button
                            onClick={() => onUpdate({ ...task, priority: 'medium', updatedAt: new Date() })}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getTaskPriorityColor('medium')} ${
                              task.priority === 'medium' ? 'ring-2 ring-blue-500' : ''
                            }`}
                          >
                            Medium
                          </button>
                          <button
                            onClick={() => onUpdate({ ...task, priority: 'high', updatedAt: new Date() })}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getTaskPriorityColor('high')} ${
                              task.priority === 'high' ? 'ring-2 ring-blue-500' : ''
                            }`}
                          >
                            High
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Assignee and Due Date */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assignee
                      </label>
                      {isEditing ? (
                        <select
                          value={editData.assigneeId}
                          onChange={(e) => setEditData(prev => ({ ...prev, assigneeId: e.target.value }))}
                          className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="">Unassigned</option>
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="flex items-center text-sm text-gray-700">
                          <User className="h-4 w-4 mr-2" />
                          {assignee ? assignee.name : 'Unassigned'}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Due Date
                      </label>
                      {isEditing ? (
                        <input
                          type="date"
                          value={editData.dueDate}
                          onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
                          className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      ) : (
                        <div className={`flex items-center text-sm ${isOverdue ? 'text-red-500' : 'text-gray-700'}`}>
                          <Calendar className="h-4 w-4 mr-2" />
                          {task.dueDate ? getRelativeDate(task.dueDate) : 'No due date'}
                          {isOverdue && <AlertCircle className="h-4 w-4 ml-2" />}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Created/Updated Info */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Created {task.createdAt.toLocaleDateString()}</span>
                      <span>Updated {task.updatedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
