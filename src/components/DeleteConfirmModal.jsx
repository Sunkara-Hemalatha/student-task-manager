import React from 'react';
import { IconAlertTriangle, IconTrash, IconClose } from './Icons';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, task, deleting }) => {
  if (!isOpen || !task) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card modal-card-sm"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="delete-modal-content">
          <div className="delete-icon-wrap">
            <IconAlertTriangle size={28} />
          </div>

          <h3 className="delete-modal-title">Delete Academic Task?</h3>
          <p className="delete-modal-text">
            Are you sure you want to permanently delete:
          </p>
          <div className="delete-task-preview">
            “{task.title}”
          </div>
          <p className="delete-modal-subtext">
            This action cannot be undone.
          </p>

          <div className="modal-actions full-width">
            <button
              type="button"
              onClick={onClose}
              disabled={deleting}
              className="btn btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirm(task._id)}
              disabled={deleting}
              className="btn btn-danger flex-1"
            >
              <IconTrash size={16} />
              <span>{deleting ? 'Deleting...' : 'Yes, Delete'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
