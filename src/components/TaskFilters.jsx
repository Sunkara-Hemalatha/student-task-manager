import React from 'react';
import { IconSearch, IconClose } from './Icons';

const TaskFilters = ({
  filters,
  onFilterChange,
  availableSubjects = [],
}) => {
  const statusTabs = [
    { key: 'all', label: 'All Tasks' },
    { key: 'today', label: 'Today’s Agenda' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
    { key: 'overdue', label: 'Overdue' },
  ];

  const defaultSubjects = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Software Engineering',
    'Chemistry',
    'Literature',
    'General',
  ];

  // Merge unique subjects
  const subjectList = ['All', ...new Set([...defaultSubjects, ...availableSubjects])];

  return (
    <div className="filter-controls-card">
      {/* Status Segmented Tabs */}
      <div className="status-tabs">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`status-tab ${filters.status === tab.key ? 'active' : ''}`}
            onClick={() => onFilterChange('status', tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Dropdowns Row */}
      <div className="filter-row">
        {/* Search Input */}
        <div className="search-input-wrapper">
          <IconSearch size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, subject or notes..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="search-input"
          />
          {filters.search && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onFilterChange('search', '')}
              title="Clear search"
            >
              <IconClose size={16} />
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="dropdowns-group">
          {/* Subject Filter */}
          <div className="select-wrapper">
            <label className="select-label">Subject</label>
            <select
              value={filters.subject}
              onChange={(e) => onFilterChange('subject', e.target.value)}
              className="select-control"
            >
              {subjectList.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="select-wrapper">
            <label className="select-label">Priority</label>
            <select
              value={filters.priority}
              onChange={(e) => onFilterChange('priority', e.target.value)}
              className="select-control"
            >
              <option value="All">All Priorities</option>
              <option value="High">🔴 High Priority</option>
              <option value="Medium">🟡 Medium Priority</option>
              <option value="Low">🟢 Low Priority</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="select-wrapper">
            <label className="select-label">Sort</label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="select-control"
            >
              <option value="dueDate">📅 Due Date (Soonest)</option>
              <option value="priority">⚡ Priority (High to Low)</option>
              <option value="createdAt">🕒 Date Added (Newest)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
