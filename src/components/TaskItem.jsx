import React from 'react';
import {
  IconCheck,
  IconClock,
  IconCalendar,
  IconEdit,
  IconTrash,
  IconBook,
} from './Icons';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const {
    _id,
    title,
    description,
    subject,
    category,
    priority,
    dueDate,
    completed,
    estimatedHours,
  } = task;

  // Calculate relative due date formatting
  const formatDueDate = (dateStr) => {
    if (!dateStr) return { text: 'No date', isOverdue: false, isToday: false };

    const due = new Date(dateStr);
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfDue = new Date(due.getFullYear(), due.getMonth(), due.getDate());

    const diffMs = startOfDue.getTime() - startOfToday.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    const timeFormatted = due.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullDateFormatted = due.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: due.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });

    if (diffDays === 0) {
      return { text: `Today at ${timeFormatted}`, isToday: true, isOverdue: false };
    }
    if (diffDays === 1) {
      return { text: `Tomorrow at ${timeFormatted}`, isToday: false, isOverdue: false };
    }
    if (diffDays === -1) {
      return { text: `Yesterday (Overdue)`, isToday: false, isOverdue: true };
    }
    if (diffDays < -1) {
      return { text: `${Math.abs(diffDays)} days overdue`, isToday: false, isOverdue: true };
    }
    if (diffDays <= 7) {
      return { text: `In ${diffDays} days (${fullDateFormatted})`, isToday: false, isOverdue: false };
    }
    return { text: fullDateFormatted, isToday: false, isOverdue: false };
  };

  const dueInfo = formatDueDate(dueDate);

  // Subject pill color classification
  const getSubjectColorClass = (sub = '') => {
    const s = sub.toLowerCase();
    if (s.includes('computer') || s.includes('code') || s.includes('software')) return 'tag-subject-cs';
    if (s.includes('math') || s.includes('calculus') || s.includes('algebra')) return 'tag-subject-math';
    if (s.includes('physics') || s.includes('chem') || s.includes('science')) return 'tag-subject-science';
    if (s.includes('literature') || s.includes('history') || s.includes('art')) return 'tag-subject-humanities';
    return 'tag-subject-default';
  };

  return (
    <article className={`task-card ${completed ? 'task-card-completed' : ''} priority-border-${priority?.toLowerCase()}`}>
      {/* Checkbox */}
      <div className="task-checkbox-col">
        <button
          type="button"
          onClick={() => onToggle(_id)}
          className={`custom-checkbox ${completed ? 'checked' : ''}`}
          title={completed ? 'Mark as incomplete' : 'Mark as completed'}
          aria-label={completed ? 'Mark as incomplete' : 'Mark as completed'}
        >
          {completed && <IconCheck size={16} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="task-body">
        <div className="task-header-row">
          <div className="task-tags-row">
            {/* Subject Tag */}
            <span className={`tag-pill ${getSubjectColorClass(subject)}`}>
              <IconBook size={13} className="inline-icon" />
              {subject || 'General'}
            </span>

            {/* Category Tag */}
            {category && (
              <span className="tag-pill tag-category">
                {category}
              </span>
            )}

            {/* Priority Tag */}
            <span className={`tag-pill tag-priority-${priority?.toLowerCase()}`}>
              {priority} Priority
            </span>
          </div>

          {/* Action Buttons */}
          <div className="task-action-buttons">
            <button
              type="button"
              onClick={() => onEdit(task)}
              className="action-btn action-btn-edit"
              title="Edit task"
            >
              <IconEdit size={16} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(task)}
              className="action-btn action-btn-delete"
              title="Delete task"
            >
              <IconTrash size={16} />
            </button>
          </div>
        </div>

        {/* Task Title */}
        <h3 className={`task-title ${completed ? 'task-title-completed' : ''}`}>
          {title}
        </h3>

        {/* Task Description / Notes */}
        {description && (
          <p className="task-description">
            {description}
          </p>
        )}

        {/* Footer Meta: Due Date & Estimated Hours */}
        <div className="task-footer">
          <div
            className={`meta-item ${
              !completed && dueInfo.isOverdue
                ? 'meta-overdue'
                : !completed && dueInfo.isToday
                ? 'meta-today'
                : 'meta-standard'
            }`}
          >
            <IconCalendar size={14} className="inline-icon" />
            <span>{dueInfo.text}</span>
          </div>

          {estimatedHours && (
            <div className="meta-item meta-standard">
              <IconClock size={14} className="inline-icon" />
              <span>{estimatedHours} hr{estimatedHours === 1 ? '' : 's'} study</span>
            </div>
          )}

          {completed && (
            <span className="completed-badge">
              ✓ Completed
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default TaskItem;
