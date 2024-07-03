import { Task } from '@core/models/task.model';
import { createReducer, on } from '@ngrx/store';
import {
  loadTasks,
  loadTasksSuccess,
  loadTasksFailure,
  createTaskSuccess,
  createTaskFailure,
  updateTask,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFailure,
} from '../../task.actions';

export interface TaskState {
  tasks: Task[];
  error: any;
}

export const initialState: TaskState = {
  tasks: [],
  error: null,
};

const _taskReducer = createReducer(
  initialState,
  on(loadTasks, (state) => ({ ...state, error: null })),
  on(loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks })),
  on(loadTasksFailure, (state, { error }) => ({ ...state, error })),
  on(createTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(createTaskFailure, (state, { error }) => ({ ...state, error })),
  on(updateTask, (state) => ({
    ...state,
    loading: true,
  })),
  on(updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    loading: false,
  })),
  on(updateTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(deleteTask, (state) => ({
    ...state,
    loading: true,
  })),
  on(deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== id),
    loading: false,
  })),
  on(deleteTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);

export function taskReducer(state: any, action: any) {
  return _taskReducer(state, action);
}
