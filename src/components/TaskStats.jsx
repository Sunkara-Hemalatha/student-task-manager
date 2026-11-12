import React from 'react';
import { IconCheckCircle, IconClock, IconAlertTriangle, IconBook } from './Icons';

const TaskStats = ({ stats, loading }) => {
  const {
    total = 0,
    completed = 0,
    pending = 0,
    dueToday = 0,
    overdue = 0,
    completionRate = 0,
  } = stats || {};

  return (
    <section className="stats-section">
      <div className="stats-grid">
        {/* Card 1: Total */}
        <div className="stat-card">
          <div className="stat-icon-wrap stat-icon-blue">
            <IconBook size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Tasks</span>
            <h3 className="stat-value">{loading ? '...' : total}</h3>
          </div>
        </div>

        {/* Card 2: Due Today */}
        <div className="stat-card stat-card-highlight">
          <div className="stat-icon-wrap stat-icon-amber">
            <IconClock size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Due Today</span>
            <h3 className="stat-value">{loading ? '...' : dueToday}</h3>
          </div>
        </div>

        {/* Card 3: Pending / In Progress */}
        <div className="stat-card">
          <div className="stat-icon-wrap stat-icon-purple">
            <IconAlertTriangle size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">In Progress</span>
            <div className="stat-sub-row">
              <h3 className="stat-value">{loading ? '...' : pending}</h3>
              {overdue > 0 && (
                <span className="overdue-tag">
                  {overdue} overdue
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card 4: Completed */}
        <div className="stat-card">
          <div className="stat-icon-wrap stat-icon-green">
            <IconCheckCircle size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Completed</span>
            <h3 className="stat-value">{loading ? '...' : completed}</h3>
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="progress-container">
        <div className="progress-header">
          <span className="progress-title">Daily Study Completion</span>
          <span className="progress-percentage">{completionRate}% Done</span>
        </div>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.min(completionRate, 100)}%` }}
          ></div>
        </div>
        <p className="progress-hint">
          {total === 0
            ? 'No tasks created yet. Click "+ Add Task" to plan your day!'
            : completionRate === 100
            ? '🎉 Outstanding! All daily tasks are finished. Take a well-deserved break!'
            : `${pending} remaining academic task${pending === 1 ? '' : 's'} to conquer today.`}
        </p>
      </div>
    </section>
  );
};

export default TaskStats;
