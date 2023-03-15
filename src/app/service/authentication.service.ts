import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const windowRef = window as any;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  constructor(private _Http: HttpClient) { }
  
  login(username: string, password: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(`${username}:${password}`)});
    return this._Http.get('http://localhost:3000/users', { headers });
  }

  isAuthenticated() {
    // Check whether the token exists in local storage
    return !!localStorage.getItem('token');
  }

  getToken() {
    // Retrieve the token from local storage
    return localStorage.getItem('token');
  }
}
