const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Fetch all tasks matching query filters
 */
export const fetchTasks = async (filters = {}) => {
  const queryParams = new URLSearchParams();

  if (filters.status && filters.status !== 'all') {
    queryParams.append('status', filters.status);
  }
  if (filters.subject && filters.subject !== 'All') {
    queryParams.append('subject', filters.subject);
  }
  if (filters.priority && filters.priority !== 'All') {
    queryParams.append('priority', filters.priority);
  }
  if (filters.search) {
    queryParams.append('search', filters.search);
  }
  if (filters.sortBy) {
    queryParams.append('sortBy', filters.sortBy);
  }
  if (filters.order) {
    queryParams.append('order', filters.order);
  }

  const url = `${API_BASE_URL}/tasks?${queryParams.toString()}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch tasks');
  }
  return data;
};

/**
 * Fetch aggregate statistics
 */
export const fetchTaskStats = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks/stats`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch task statistics');
  }
  return data.data;
};

/**
 * Create a new task
 */
export const createTask = async (taskData) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create task');
  }
  return data;
};

/**
 * Update an existing task
 */
export const updateTask = async (id, taskData) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update task');
  }
  return data;
};

/**
 * Toggle task completion status
 */
export const toggleTaskComplete = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/toggle`, {
    method: 'PATCH',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to toggle task status');
  }
  return data;
};

/**
 * Delete a task
 */
export const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete task');
  }
  return data;
};

/**
 * Seed realistic student demo tasks
 */
export const seedSampleTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks/seed`, {
    method: 'POST',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to seed sample tasks');
  }
  return data;
};
