import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '@core/models/task.model';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import * as TaskActions from '../../../state/task.actions';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { MatMenuModule } from '@angular/material/menu';
import { RelativeDatePipe } from '@core/pipes/relative-date.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    RelativeDatePipe,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
  ],

  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task!: Task;
  tagColors = {
    ANDROID: '#E5B454',
    IOS: '#70B2521A',
    NODE_JS: '#0000ff',
    RAILS: '#5430ff',
    REACT: '#ff00ff',
  };

  constructor(private dialog: MatDialog, private store: Store) {}

  editTask(task: Task): void {
    this.dialog.open(TaskModalComponent, {
      data: { task },
    });
  }

  deleteTask(taskId: string): void {
    this.store.dispatch(TaskActions.deleteTask({ id: taskId }));
  }
}
