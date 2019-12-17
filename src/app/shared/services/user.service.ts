import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { LoginInfo, TokenRefreshInfo, UserInfo, RegisterResponse, ForceRegisterResponse } from '../models/user';
import { BaseResponse } from '../models/base-res';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public router: Router, public http: HttpClient, public auth: AuthService) { }

  public isLoggedIn(): boolean {
    return this.auth.getLoginInfo() ? true : false;
  }

  register(email: string, password: string): Observable<RegisterResponse> {
    return this.http.post<BaseResponse>('/dss/user/register', { email, password }, { headers: { Authorization: '' } }).pipe(
      map((res: BaseResponse) => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        return res.result;
      }), catchError(err => {
        if (err instanceof HttpErrorResponse) {
          return throwError({status: err.status, result: err.error});
        }
        return throwError(err);
      })
    );
  }

  forceRegister(email: string, password: string): Observable<ForceRegisterResponse> {
    return this.http.post<BaseResponse>('/dss/user/forceregister', { email, password }).pipe(
      map((res: BaseResponse) => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        return res.result;
      }), catchError(err => {
        if (err instanceof HttpErrorResponse) {
          return throwError({status: err.status, result: err.error});
        }
        return throwError(err);
      })
    );
  }

  login(username: string, password: string): Observable<LoginInfo> {
    const source = 'dss';
    return this.http.post<BaseResponse>('/dss/user/login', {username, password, source}, {headers: {Authorization: ''}}).pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        this.auth.setLoginInfo(res.result);
        return res.result;
      }), catchError(err => {
        if (err instanceof HttpErrorResponse) {
          return throwError({status: err.status, result: err.error});
        }
        return throwError(err);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  refreshToken(token: string): Observable<TokenRefreshInfo> {
    return this.http.post<TokenRefreshInfo>('/auth/oauth/token',
            `grant_type=refresh_token&refresh_token=${token}`,
            {headers: {
              Authorization: 'Basic bGVhcGFpLWNsaWVudDpsZWFwYWktc2VjcmV0',
              'Content-Type': 'application/x-www-form-urlencoded'
            }})
      .pipe(
        tap(res => {
          if (!res.access_token || !res.refresh_token) {
            throw res;
          }
          return res;
        }), catchError(err => {
          if (err instanceof HttpErrorResponse) {
            return throwError({status: err.status, result: err.error});
          }
          return throwError(err);
        })
      );
  }

  getCurrentUser(): UserInfo {
    const info = localStorage.getItem('user');
    if (info) {
      return JSON.parse(info);
    } else {
      return null;
    }
  }

  setCurrentUser(info: UserInfo) {
    localStorage.setItem('user', JSON.stringify(info));
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<BaseResponse>('/dss/user/userinfo').pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        this.setCurrentUser(res.result);
        return res.result;
      }), catchError(err => {
        if (err instanceof HttpErrorResponse) {
          return throwError({status: err.status, result: err.error});
        }
        return throwError(err);
      })
    );
  }

  isAdmin(): boolean {
    const info = this.getCurrentUser();
    if (!info || !info.roles) {
      return false;
    } else {
      return info.roles.toLowerCase().includes('admin');
    }
  }

  updatePwd(json) {
    return this.http.post('/leez/v1/users/updatePwd', json);
  }

  updateEmail(email) {
    return this.http.post('/leez/v1/users/updateEmail/${email}', {});
  }
}
