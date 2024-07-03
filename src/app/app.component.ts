import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterModule,
    CommonModule,
    SidebarComponent,
    RouterOutlet,
    RouterLink,
  ],
  styleUrl: './app.component.scss',
})
export class AppComponent {}
