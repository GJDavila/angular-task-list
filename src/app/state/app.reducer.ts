import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state'; // Ajusta la ruta
import { taskReducer } from './reducers/task/task.reducer';
import { userReducer } from './reducers/user/user.reducer';


export const reducers: ActionReducerMap<AppState> = {
  tasks: taskReducer,
  users: userReducer
};
