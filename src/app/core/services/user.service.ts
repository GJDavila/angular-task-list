import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/core/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://syn-api-prod.herokuapp.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/users');
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/user');
  }
}
