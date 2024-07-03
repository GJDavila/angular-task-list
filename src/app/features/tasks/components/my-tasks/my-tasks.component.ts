import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardComponent } from '@app/shared/components/dashboard/dashboard.component';
import { User } from '@core/models/user.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromUser from '../../../../state/reducers/user/user.reducer';
import * as UserActions from '../../../../state/user.actions';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [DashboardComponent, CommonModule],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.scss',
})
export class MyTasksComponent {
  user$: Observable<User | null>;
  currentUser: User | null = null;

  constructor(private store: Store<{ users: fromUser.UserState }>) {
    this.user$ = store.select((state) => state.users.user);
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadCurrentUser({ filters: {} }));

    this.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }
}
