import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from '@core/models/task.model';
import { UpdateTask } from '@core/models/update-task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://syn-api-prod.herokuapp.com';

  constructor(private http: HttpClient) {}

  
  getTasks(params: any): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`, { params });
  }
  
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task);
  }

  updateTask(task: UpdateTask, id: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`);
  }
}
