import React, { useState, useEffect } from 'react';
import { IconClose, IconPlus, IconEdit } from './Icons';

const TaskModal = ({ isOpen, onClose, onSubmit, taskToEdit, submitting }) => {
  const isEditing = Boolean(taskToEdit);

  const getInitialDueDate = () => {
    // Default to tomorrow at 5:00 PM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(17, 0, 0, 0);
    return tomorrow.toISOString().slice(0, 16);
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: 'Computer Science',
    category: 'Assignment',
    priority: 'Medium',
    dueDate: getInitialDueDate(),
    estimatedHours: 2,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      // Format existing dueDate to yyyy-MM-ddThh:mm
      let formattedDate = getInitialDueDate();
      if (taskToEdit.dueDate) {
        const d = new Date(taskToEdit.dueDate);
        // Adjust to local ISO string
        const offset = d.getTimezoneOffset() * 60000;
        formattedDate = new Date(d.getTime() - offset).toISOString().slice(0, 16);
      }

      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        subject: taskToEdit.subject || 'General',
        category: taskToEdit.category || 'Assignment',
        priority: taskToEdit.priority || 'Medium',
        dueDate: formattedDate,
        estimatedHours: taskToEdit.estimatedHours || 1,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        subject: 'Computer Science',
        category: 'Assignment',
        priority: 'Medium',
        dueDate: getInitialDueDate(),
        estimatedHours: 2,
      });
    }
    setError('');
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide a task title.');
      return;
    }
    if (!formData.dueDate) {
      setError('Please provide a valid due date and time.');
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-title-icon">
              {isEditing ? <IconEdit size={20} /> : <IconPlus size={20} />}
            </div>
            <div>
              <h2 className="modal-title">
                {isEditing ? 'Edit Academic Task' : 'Add New Task'}
              </h2>
              <p className="modal-subtitle">
                {isEditing
                  ? 'Update deadline, priority or notes'
                  : 'Track your daily study agenda and homework'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close modal"
          >
            <IconClose size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="form-error-alert">{error}</div>}

          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="task-title">
              Task Title <span className="text-required">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              name="title"
              placeholder="e.g. Implement Binary Search Tree in C++"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              autoFocus
              maxLength={200}
            />
          </div>

          {/* Row: Subject & Category */}
          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label" htmlFor="task-subject">
                Subject / Course <span className="text-required">*</span>
              </label>
              <input
                id="task-subject"
                type="text"
                name="subject"
                list="subject-suggestions"
                placeholder="e.g. Computer Science, Math"
                value={formData.subject}
                onChange={handleChange}
                className="form-input"
              />
              <datalist id="subject-suggestions">
                <option value="Computer Science" />
                <option value="Mathematics" />
                <option value="Physics" />
                <option value="Chemistry" />
                <option value="Software Engineering" />
                <option value="Literature" />
                <option value="History" />
                <option value="Biology" />
              </datalist>
            </div>

            <div className="form-group flex-1">
              <label className="form-label" htmlFor="task-category">
                Task Category
              </label>
              <select
                id="task-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Assignment">Assignment</option>
                <option value="Exam Prep">Exam Prep / Quiz</option>
                <option value="Project">Project / Lab</option>
                <option value="Revision">Revision</option>
                <option value="Homework">Homework</option>
                <option value="Reading">Reading</option>
                <option value="Personal">Personal / Extracurricular</option>
              </select>
            </div>
          </div>

          {/* Row: Priority, Due Date & Estimated Hours */}
          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label" htmlFor="task-priority">
                Priority Level
              </label>
              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-select"
              >
                <option value="High">🔴 High Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="Low">🟢 Low Priority</option>
              </select>
            </div>

            <div className="form-group flex-1">
              <label className="form-label" htmlFor="task-dueDate">
                Due Date & Time <span className="text-required">*</span>
              </label>
              <input
                id="task-dueDate"
                type="datetime-local"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group flex-half">
              <label className="form-label" htmlFor="task-estHours">
                Est. Hours
              </label>
              <input
                id="task-estHours"
                type="number"
                name="estimatedHours"
                step="0.5"
                min="0.5"
                max="24"
                value={formData.estimatedHours}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          {/* Description / Notes */}
          <div className="form-group">
            <label className="form-label" htmlFor="task-desc">
              Description / Notes (Optional)
            </label>
            <textarea
              id="task-desc"
              name="description"
              rows="3"
              placeholder="Add chapter references, submission portals, questions or notes..."
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
            ></textarea>
          </div>

          {/* Form Actions */}
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting
                ? 'Saving...'
                : isEditing
                ? 'Save Changes'
                : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
