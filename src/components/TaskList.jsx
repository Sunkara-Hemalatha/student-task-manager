import React from 'react';
import TaskItem from './TaskItem';
import { IconBook, IconPlus, IconSparkles } from './Icons';

const TaskList = ({
  tasks,
  loading,
  onToggle,
  onEdit,
  onDelete,
  onOpenAddTask,
  onSeedDemo,
}) => {
  if (loading) {
    return (
      <div className="task-list-loading">
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
        <div className="skeleton-card"></div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-icon-wrap">
          <IconBook size={48} />
        </div>
        <h3 className="empty-title">No Tasks Found</h3>
        <p className="empty-subtitle">
          You don't have any daily tasks in this view. Keep your study schedule organized by adding tasks or loading samples!
        </p>
        <div className="empty-actions">
          <button
            type="button"
            onClick={onOpenAddTask}
            className="btn btn-primary"
          >
            <IconPlus size={18} />
            <span>Create a Task</span>
          </button>
          <button
            type="button"
            onClick={onSeedDemo}
            className="btn btn-secondary"
          >
            <IconSparkles size={18} />
            <span>Load Sample Tasks</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <span className="task-count-text">
          Showing <strong>{tasks.length}</strong> task{tasks.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="task-cards-stack">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
