import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';  

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  constructor(private http: HttpClient) {}

  updateUser(user: any): Observable<any> {
    return this.http.put('/api/user', user); // ajuste a URL real
  }
}
