import { User } from '@core/models/user.model';

import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction(
  '[User] Load Users',
  props<{ filters: any }>()
);
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

// current user
export const loadCurrentUser = createAction(
  '[User] Load CurrentUser',
  props<{ filters: any }>()
);
export const loadCurrentUserSuccess = createAction(
  '[User] Load CurrentUser Success',
  props<{ user: User }>()
);
export const loadCurrentUserFailure = createAction(
  '[User] Load CurrentUser Failure',
  props<{ error: any }>()
);
