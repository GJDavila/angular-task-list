import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TaskCardComponent } from '../../../core/components/task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { Task } from '@core/models/task.model';
import { Store } from '@ngrx/store';

import * as fromTask from '../../../state/reducers/task/task.reducer';
import * as TaskActions from '../../../state/task.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../../../core/components/task-modal/task-modal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { User } from '@core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    FormsModule,
    TaskCardComponent,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @Input() currentUser: User | null = null;

  searchQuery: string = '';
  taskStatuses: string[] = [
    'BACKLOG',
    'TODO',
    'IN_PROGRESS',
    'DONE',
    'CANCELLED',
  ];

  currentView: 'milestones' | 'list' = 'milestones';

  tasks$: Observable<Task[]>;
  taskResult: Task[] = [];

  constructor(
    private dialog: MatDialog,
    private store: Store<{ tasks: fromTask.TaskState }>
  ) {
    this.tasks$ = store.select((state) => state.tasks?.tasks);
  }

  openCreateTaskModal() {
    this.dialog.open(TaskModalComponent, {});
  }

  ngOnInit(): void {
    const filters = this.currentUser ? { assigneeId: this.currentUser.id } : {};
    this.store.dispatch(TaskActions.loadTasks({ filters }));

    this.tasks$.subscribe((tasks) => {
      this.taskResult = tasks;
    });
  }

  getTasksByStatus(status: string) {
    return this.taskResult?.filter((task) => task.status === status);
  }

  onSearch() {
    let filters = {};
    if (this.searchQuery) filters = { name: this.searchQuery };
    if (this.currentUser?.id)
      filters = { ...filters, assigneeId: this.currentUser.id };
    this.store.dispatch(TaskActions.loadTasks({ filters }));
  }

  toggleView(view: 'milestones' | 'list'): void {
    this.currentView = view;
  }
}
