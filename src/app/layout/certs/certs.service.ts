import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseResponse } from '../../shared/models/base-res';

@Injectable({
  providedIn: 'root'
})
export class CertsService {

  constructor(public http: HttpClient) { }

  list() {
    return this.http.get<BaseResponse>('/dss/scep/list').pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        return res.result;
      }),
      catchError(err => {
        return of({});
      })
    );
  }

  getInfo(filename: string) {
    return this.http.get<BaseResponse>(`/dss/scep/getInfo/${filename}`).pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        return JSON.parse(res.result);
      }),
      catchError(err => {
        return of({});
      })
    );
  }

  delete(filename: string): Observable<boolean> {
    return this.http.delete<BaseResponse>(`/dss/scep/delete/${filename}`).pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        return true;
      }),
      catchError(err => {
        return of(false);
      })
    );
  }
}
