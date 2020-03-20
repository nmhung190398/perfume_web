import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SERVER_API_URL} from '../app.constants';
import {User} from '../model/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${SERVER_API_URL}/users`);
  }

  register(user: User) {
    return this.http.post(`${SERVER_API_URL}/users/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${SERVER_API_URL}/users/${id}`);
  }
}
