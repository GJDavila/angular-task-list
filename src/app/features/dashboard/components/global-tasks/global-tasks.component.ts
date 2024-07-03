import { Component } from '@angular/core';
import { DashboardComponent } from '@app/shared/components/dashboard/dashboard.component';

@Component({
  selector: 'app-global-tasks',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './global-tasks.component.html',
  styleUrl: './global-tasks.component.scss'
})
export class GlobalTasksComponent {
}
