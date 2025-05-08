import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';  
import { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080';
  private admin = "admin";
  private role = "role";
  private user = "user";
  private signup = "signup";
  private signin = "signin";
  private delete = "delete";
  private all = "all";

  constructor(private http: HttpClient) {}

  //updateUser(user: any): Observable<any> {
  //  return this.http.put(`${this.baseUrl}/${this.user}/${this.signup}`, user); // ajuste a URL real
  //}

  getUserById(userId: String): Observable<any> {
    return this.http.get(`/api/user/${userId}`); // ajuste a URL real
  }

  deleteUser(userId: String): Observable<any> {
    return this.http.delete(`/api/user/${userId}`); // ajuste a URL real
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${this.user}/${this.all}`); // ajuste a URL real
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`/api/user/email/${email}`); // ajuste a URL real
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post('/api/user/signin', { email, password }); // ajuste a URL real
  }

  signUp(user: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/${this.user}/${this.signup}`, user); // ajuste a URL real
  }

  updateUserRole(user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${this.user}/${this.admin}/${this.role}`, user);
  }
}
