import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import * as TaskActions from '../../../state/task.actions';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { User } from '@core/models/user.model';
import { Task } from '@core/models/task.model';
import { Observable } from 'rxjs';
import * as fromUser from '../../../state/reducers/user/user.reducer';
import * as UserActions from '../../../state/user.actions';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class TaskModalComponent {
  taskForm: FormGroup;
  tags: string[] = ['ANDROID', 'IOS', 'NODE_JS', 'RAILS', 'REACT'];
  taskStatuses: {
    value: string;
    name: string;
  }[] = [
    { value: 'BACKLOG', name: 'Backlog' },
    { value: 'TODO', name: 'Todo' },
    { value: 'IN_PROGRESS', name: 'In Progress' },
    { value: 'DONE', name: 'Done' },
    { value: 'COMPLETED', name: 'Completed' },
    { value: 'CANCELLED', name: 'Cancelled' },
  ];

  pointsEstimate: string[] = ['0', '1', '2', '4', '8'];
  users$: Observable<User[]>;
  usersResult: User[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskModalComponent>,
    private store: Store<{ users: fromUser.UserState }>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: Task }
  ) {
    this.taskForm = this.fb.group({
      name: [this.data?.task?.name || '', Validators.required],
      tags: [this.data?.task?.tags || [], Validators.required],
      status: [this.data?.task?.status || 'BACKLOG', Validators.required],
      pointEstimate: [this.data?.task?.pointEstimate || 0, Validators.required],
      dueDate: [this.data?.task?.dueDate || new Date(), Validators.required],
      assigneeId: [this.data?.task?.assignee?.id || '', Validators.required],
    });

    this.users$ = store.select((state) => state.users?.users);

  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers({filters: {}}));

    this.users$.subscribe((users) => {
      this.usersResult = users;
    });
  }
  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task = {
        name: formValue.name,
        tags: formValue.tags,
        status: formValue.status,
        pointEstimate: formValue.pointEstimate.toString(),
        dueDate: formValue.dueDate, //.toISOString(),
        assigneeId: formValue.assigneeId,
      };
      const id = this.data?.task?.id;
      if (id) {
        this.store.dispatch(TaskActions.updateTask({ task, id }));
      } else {
        this.store.dispatch(TaskActions.createTask({ task }));
      }

      this.dialogRef.close();
    }
  }

  onCancel(e: Event) {
    e.preventDefault();
    this.dialogRef.close();
  }
}
