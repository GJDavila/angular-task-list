import { User } from './user.model';

export interface Task {
  id?: string;
  name: string;
  tags: string[];
  status: string;
  assignee: User;
  creator: User;
  position?: number;
  dueDate: Date;
  pointEstimate: string;
  createdAt: Date;
}
