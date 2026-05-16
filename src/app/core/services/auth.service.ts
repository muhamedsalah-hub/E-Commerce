import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { IUserData } from '../interfaces/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  userData: IUserData | null = null;

  setRegisterForm(data: object): Observable<any> {
    return this._HttpClient.post(`${API_BASE_URL}/api/v1/auth/signup`, data);
  }
  setLoginForm(data: object): Observable<any> {
    return this._HttpClient.post(`${API_BASE_URL}/api/v1/auth/signin`, data);
  }
  getUserData(): void {
    if (localStorage.getItem('token') !== null) {
      this.userData = jwtDecode(localStorage.getItem('token')!);
      // console.log(this.userData);
    }
  }
  logOut(): void {
    localStorage.removeItem('token');
    this.userData = null;
    this._Router.navigate(['/login']);
  }

  setVerifyEmail(data:object):Observable<any>{
    return this._HttpClient.post(`${API_BASE_URL}/api/v1/auth/forgotPasswords`,data)
  }
  setVerifyCode(data:object):Observable<any>{
    return this._HttpClient.post(`${API_BASE_URL}/api/v1/auth/verifyResetCode`,data)
  }

  setResetPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${API_BASE_URL}/api/v1/auth/resetPassword`,data)
  }
}
