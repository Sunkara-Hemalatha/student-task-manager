import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TaskStats from './components/TaskStats';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import {
  fetchTasks,
  fetchTaskStats,
  createTask,
  updateTask,
  toggleTaskComplete,
  deleteTask,
  seedSampleTasks,
} from './api/taskApi';

function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    dueToday: 0,
    overdue: 0,
    completionRate: 0,
    subjects: [],
  });

  const [filters, setFilters] = useState({
    status: 'all',
    subject: 'All',
    priority: 'All',
    search: '',
    sortBy: 'dueDate',
    order: 'asc',
  });

  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Toast feedback
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Load stats and tasks
  const loadStats = useCallback(async () => {
    try {
      const statsData = await fetchTaskStats();
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchTasks(filters);
      setTasks(res.data || []);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      showToast(err.message || 'Error fetching tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadTasks();
    loadStats();
  }, [loadTasks, loadStats]);

  // Filter change handler
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Toggle complete (with optimistic UI update)
  const handleToggleComplete = async (taskId) => {
    try {
      // Optimistic update
      setTasks((prevTasks) =>
        prevTasks.map((t) => {
          if (t._id === taskId) {
            return {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date() : null,
            };
          }
          return t;
        })
      );

      const res = await toggleTaskComplete(taskId);
      showToast(res.message || 'Task status updated');
      loadStats();
    } catch (err) {
      showToast(err.message || 'Failed to update task', 'error');
      loadTasks(); // rollback on failure
    }
  };

  // Open modal for new task
  const handleOpenAddTask = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEditTask = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  // Save (Create or Update)
  const handleSaveTask = async (formData) => {
    try {
      setSubmitting(true);
      if (taskToEdit) {
        await updateTask(taskToEdit._id, formData);
        showToast('Task updated successfully!');
      } else {
        await createTask(formData);
        showToast('New academic task added!');
      }

      setIsTaskModalOpen(false);
      setTaskToEdit(null);
      await loadTasks();
      await loadStats();
    } catch (err) {
      showToast(err.message || 'Failed to save task', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Open delete confirmation
  const handleOpenDelete = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = async (taskId) => {
    try {
      setDeleting(true);
      await deleteTask(taskId);
      showToast('Task deleted successfully');
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
      await loadTasks();
      await loadStats();
    } catch (err) {
      showToast(err.message || 'Failed to delete task', 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Seed realistic demo tasks
  const handleSeedDemo = async () => {
    try {
      setSeeding(true);
      await seedSampleTasks();
      showToast('Sample student tasks loaded successfully!');
      await loadTasks();
      await loadStats();
    } catch (err) {
      showToast(err.message || 'Failed to seed sample tasks', 'error');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="app-container">
        {/* Navigation & Header */}
        <Header
          onOpenAddTask={handleOpenAddTask}
          onSeedDemo={handleSeedDemo}
          seeding={seeding}
        />

        {/* Dashboard Statistics & Progress */}
        <TaskStats stats={stats} loading={loading} />

        {/* Filters, Search & View Controls */}
        <TaskFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          availableSubjects={stats.subjects || []}
        />

        {/* Tasks List */}
        <main>
          <TaskList
            tasks={tasks}
            loading={loading}
            onToggle={handleToggleComplete}
            onEdit={handleOpenEditTask}
            onDelete={handleOpenDelete}
            onOpenAddTask={handleOpenAddTask}
            onSeedDemo={handleSeedDemo}
          />
        </main>
      </div>

      {/* Add / Edit Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={handleSaveTask}
        taskToEdit={taskToEdit}
        submitting={submitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        task={taskToDelete}
        deleting={deleting}
      />
    </div>
  );
}

export default App;
