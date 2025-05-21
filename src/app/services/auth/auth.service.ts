import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get userRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isAdmin(): boolean {
    if(this.userRole == null) return false;
    return this.userRole === 'ROLE_ADMIN';
  }

  isUser(): boolean {
    if(this.userRole == null) return false;
    return this.userRole === 'ROLE_USER';
  }

  isLogued(): boolean {
    return this.isUser() || this.isAdmin();
  }
}