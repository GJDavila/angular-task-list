export interface UpdateTask {
  name: string;
  tags: string[];
  status: string;
  assigneeId: string;
  position?: number;
  dueDate: Date;
  pointEstimate: string;
}
