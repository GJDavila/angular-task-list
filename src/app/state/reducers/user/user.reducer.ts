import { User } from '@core/models/user.model';
import { createReducer, on } from '@ngrx/store';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  loadCurrentUser,
  loadCurrentUserSuccess,
  loadCurrentUserFailure,
} from '../../user.actions';

export interface UserState {
  users: User[];
  user: User | null;
  error: any;
}

export const initialState: UserState = {
  users: [],
  user: null,
  error: null,
};

const _userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({ ...state, error: null })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, error })),
  
  on(loadCurrentUser, (state) => ({ ...state, error: null })),
  on(loadCurrentUserSuccess, (state, { user }) => ({ ...state, user })),
  on(loadCurrentUserFailure, (state, { error }) => ({ ...state, error }))
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
