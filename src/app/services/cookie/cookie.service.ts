import { Injectable } from '@angular/core';
import { CookieService as AngularCookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor(private cookieService: AngularCookieService) {}

  getAuthToken(): string {
    console.log('Getting auth token from cookie');
    console.log(this.cookieService.get('jwt')); 
    return this.cookieService.get('jwt'); 
  }

  isAdmin(): boolean {
    const token = this.getAuthToken();
    if (token) {
      const payload = this.decodeJwt(token);
      return payload.roles && payload.roles.includes('ROLE_ADMIN');
    }
    return false;
  }

  isUser(): boolean {
    const token = this.getAuthToken();
    if (token && this.isAuthenticated()) {
      const payload = this.decodeJwt(token);
      return payload.roles && payload.roles.includes('ROLE_USER');
    }
    return false;
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if (token) {
      const payload = this.decodeJwt(token);
      return payload.exp > Date.now() / 1000;
    }
    return false;
  }

  public decodeJwt(token: string): any {
    const payloadBase64 = token.split('.')[1]; 
    const decodedPayload = atob(payloadBase64);  
    return JSON.parse(decodedPayload);
  }
}
