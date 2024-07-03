import { Routes } from '@angular/router';
import { NotFoundComponent } from '@core/components/not-found/not-found.component';
import { MyTasksComponent } from './features/tasks/components/my-tasks/my-tasks.component';
import { GlobalTasksComponent } from './features/dashboard/components/global-tasks/global-tasks.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: GlobalTasksComponent },
  { path: 'tasks', component: MyTasksComponent },
  { path: '**', component: NotFoundComponent },
];