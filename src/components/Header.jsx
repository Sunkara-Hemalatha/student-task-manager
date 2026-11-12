import React from 'react';
import { IconGraduationCap, IconPlus, IconSparkles } from './Icons';

const Header = ({ onOpenAddTask, onSeedDemo, seeding }) => {
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(new Date());

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon-wrapper">
          <IconGraduationCap size={28} className="brand-icon" />
        </div>
        <div>
          <h1 className="brand-title">Student Task Manager</h1>
          <p className="brand-subtitle">
            Organize daily tasks, assignments & study goals
          </p>
        </div>
      </div>

      <div className="header-actions">
        <div className="date-badge">
          <span className="date-dot"></span>
          <span>{todayFormatted}</span>
        </div>

        <button
          type="button"
          onClick={onSeedDemo}
          disabled={seeding}
          className="btn btn-secondary btn-icon"
          title="Load realistic sample student tasks"
        >
          <IconSparkles size={18} />
          <span>{seeding ? 'Loading...' : 'Sample Tasks'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenAddTask}
          className="btn btn-primary btn-icon"
        >
          <IconPlus size={18} />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
