
import { TaskState } from "./reducers/task/task.reducer";
import { UserState } from "./reducers/user/user.reducer";


export interface AppState {
  tasks: TaskState;
  users: UserState;
}
