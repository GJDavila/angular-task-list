import { Task } from '@core/models/task.model';
import { UpdateTask } from '@core/models/update-task.model';
import { createAction, props } from '@ngrx/store';

export const loadTasks = createAction('[Task] Load Tasks',  props<{ filters: any }>());
export const loadTasksSuccess = createAction('[Task] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure', props<{ error: any }>());

export const createTask = createAction('[Task] Create Task', props<{ task: any }>());
export const createTaskSuccess = createAction('[Task] Create Task Success', props<{ task: any }>());
export const createTaskFailure = createAction('[Task] Create Task Failure', props<{ error: any }>());

export const updateTask = createAction('[Task] Update Task', props<{ task: UpdateTask, id: string }>());
export const updateTaskSuccess = createAction('[Task] Update Task Success', props<{ task: Task }>());
export const updateTaskFailure = createAction('[Task] Update Task Failure', props<{ error: any }>());

export const deleteTask = createAction('[Task] Delete Task', props<{ id: string }>());
export const deleteTaskSuccess = createAction('[Task] Delete Task Success', props<{ id: string }>());
export const deleteTaskFailure = createAction('[Task] Delete Task Failure', props<{ error: any }>());