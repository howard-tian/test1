import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(public http: HttpClient) { }

  getVersion(): Observable<string> {
    return this.http.get('/assets/version.txt', { responseType: 'text' });
  }
}
