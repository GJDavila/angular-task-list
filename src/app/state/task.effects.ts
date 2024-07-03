import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TaskService } from '../core/services/task.service';
import { TaskState } from './reducers/task/task.reducer';
import {
  loadTasks,
  createTask,
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
} from './task.actions';

@Injectable()
export class TaskEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      mergeMap((action) =>
        this.taskService.getTasks(action.filters).pipe(
          map((tasks) => loadTasksSuccess({ tasks })),
          catchError((error) => of(loadTasksFailure({ error })))
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTask),
      mergeMap((action) =>
        this.taskService.createTask(action.task).pipe(
          map((task) => createTaskSuccess({ task })),
          catchError((error) => of(createTaskFailure({ error })))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTask),
      mergeMap((action) =>
        this.taskService.updateTask(action.task, action.id).pipe(
          map((task) => updateTaskSuccess({ task })),
          catchError((error) => of(updateTaskFailure({ error })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTask),
      mergeMap((action) =>
        this.taskService.deleteTask(action.id).pipe(
          map(() => deleteTaskSuccess({ id: action.id })),
          catchError((error) => of(deleteTaskFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store<TaskState>
  ) {}
}
