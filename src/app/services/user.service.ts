import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';  
import { User } from '../models/user/user.model';
import { environment } from '../../environments/environment';

console.log(environment.apiUrl);

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl; 
  private admin = "admin";
  private role = "role";
  private user = "user";
  private signup = "signup";
  private signin = "signin";
  private delete = "delete";
  private all = "all";

  constructor(private http: HttpClient) {}

  getUserById(userId: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.user}/${userId}`, { withCredentials: true }); 
  }

  deleteUser(userId: String): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${this.user}/${userId}`, { withCredentials: true }); 
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${this.user}/${this.admin}/${this.all}`, { withCredentials: true });
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${this.user}/${email}`); 
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.user}/${this.signin}`, { email, password }, { withCredentials: true }); 
  }

  signUp(user: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/${this.user}/${this.signup}`, user, { withCredentials: true }); 
  }

  updateUserRole(user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${this.user}/${this.admin}/${this.role}`, user);
  }

}
