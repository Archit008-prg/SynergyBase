import React, { useState } from 'react';
import { X, Calendar, Edit, Trash2, Save, AlertCircle } from 'lucide-react';
import { Task, User as UserType } from '../types';
import { getTaskStatusColor, getTaskPriorityColor, getRelativeDate, isTaskOverdue } from '../utils/helpers';

interface TaskDetailModalProps {
  task: Task;
  users: UserType[];
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

// Reusable button for tags (status/priority)
const TagButton: React.FC<{
  label: string;
  value: string;
  activeValue: string;
  colorClass: string;
  onClick: (value: string) => void;
}> = ({ label, value, activeValue, colorClass, onClick }) => (
  <button
    onClick={() => onClick(value)}
    className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass} ${
      value === activeValue ? 'ring-2 ring-blue-500' : ''
    } transition hover:brightness-95`}
  >
    {label}
  </button>
);

// Reusable editable field
const EditableField: React.FC<{
  label: string;
  value: string;
  isEditing: boolean;
  onChange?: (value: string) => void;
  type?: 'text' | 'textarea' | 'select' | 'date';
  options?: { value: string; label: string }[];
}> = ({ label, value, isEditing, onChange, type = 'text', options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    {isEditing ? (
      type === 'textarea' ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      ) : type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      )
    ) : (
      <p className="text-sm text-gray-700 whitespace-pre-wrap">{value || '—'}</p>
    )}
  </div>
);

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  users,
  onClose,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    assigneeId: task.assigneeId || '',
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : '',
  });

  const assignee = users.find((u) => u.id === task.assigneeId);
  const isOverdue = isTaskOverdue(task);

  const handleSave = () => {
    onUpdate({
      ...task,
      ...editData,
      assigneeId: editData.assigneeId || null,
      dueDate: editData.dueDate ? new Date(editData.dueDate) : null,
      updatedAt: new Date(),
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Task Details</h3>
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

            {/* Content */}
            <div className="space-y-6">
              <EditableField
                label="Title"
                value={editData.title}
                isEditing={isEditing}
                onChange={(v) =>
                  setEditData((prev) => ({ ...prev, title: v }))
                }
              />
              <EditableField
                label="Description"
                value={editData.description}
                isEditing={isEditing}
                onChange={(v) =>
                  setEditData((prev) => ({ ...prev, description: v }))
                }
                type="textarea"
              />

              {/* Status & Priority */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  {isEditing ? (
                    <EditableField
                      type="select"
                      value={editData.status}
                      onChange={(v) =>
                        setEditData((prev) => ({
                          ...prev,
                          status: v as Task['status'],
                        }))
                      }
                      isEditing
                      options={[
                        { value: 'todo', label: 'To Do' },
                        { value: 'in_progress', label: 'In Progress' },
                        { value: 'done', label: 'Done' },
                      ]}
                    />
                  ) : (
                    <div className="flex space-x-2">
                      {(['todo', 'in_progress', 'done'] as Task['status'][]).map(
                        (s) => (
                          <TagButton
                            key={s}
                            label={s
                              .replace('_', ' ')
                              .replace(/\b\w/g, (c) => c.toUpperCase())}
                            value={s}
                            activeValue={task.status}
                            colorClass={getTaskStatusColor(s)}
                            onClick={(v) =>
                              onUpdate({
                                ...task,
                                status: v as Task['status'],
                                updatedAt: new Date(),
                              })
                            }
                          />
                        )
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  {isEditing ? (
                    <EditableField
                      type="select"
                      value={editData.priority}
                      onChange={(v) =>
                        setEditData((prev) => ({
                          ...prev,
                          priority: v as Task['priority'],
                        }))
                      }
                      isEditing
                      options={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' },
                      ]}
                    />
                  ) : (
                    <div className="flex space-x-2">
                      {(['low', 'medium', 'high'] as Task['priority'][]).map(
                        (p) => (
                          <TagButton
                            key={p}
                            label={p.charAt(0).toUpperCase() + p.slice(1)}
                            value={p}
                            activeValue={task.priority}
                            colorClass={getTaskPriorityColor(p)}
                            onClick={(v) =>
                              onUpdate({
                                ...task,
                                priority: v as Task['priority'],
                                updatedAt: new Date(),
                              })
                            }
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Assignee & Due Date */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {isEditing ? (
                  <EditableField
                    label="Assignee"
                    value={editData.assigneeId}
                    isEditing
                    type="select"
                    onChange={(v) =>
                      setEditData((prev) => ({ ...prev, assigneeId: v }))
                    }
                    options={[
                      { value: '', label: 'Unassigned' },
                      ...users.map((u) => ({ value: u.id, label: u.name })),
                    ]}
                  />
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assignee
                    </label>
                    <p className="text-sm text-gray-700">
                      {assignee ? assignee.name : 'Unassigned'}
                    </p>
                  </div>
                )}

                {isEditing ? (
                  <EditableField
                    label="Due Date"
                    type="date"
                    value={editData.dueDate}
                    isEditing
                    onChange={(v) =>
                      setEditData((prev) => ({ ...prev, dueDate: v }))
                    }
                  />
                ) : (
                  <div
                    className={`flex items-center text-sm ${
                      isOverdue ? 'text-red-500' : 'text-gray-700'
                    }`}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {task.dueDate ? getRelativeDate(task.dueDate) : 'No due date'}
                    {isOverdue && <AlertCircle className="h-4 w-4 ml-2" />}
                  </div>
                )}
              </div>

              {/* Created/Updated */}
              <div className="pt-4 border-t border-gray-200 flex justify-between text-xs text-gray-500">
                <span>Created {task.createdAt.toLocaleDateString()}</span>
                <span>Updated {task.updatedAt.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
