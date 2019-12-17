import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseResponse } from '../../shared/models/base-res';
import { EndUser, EndUserPage } from './end-user';

@Injectable({
  providedIn: 'root'
})
export class EndUserService {

  constructor(public http: HttpClient) { }

  getPage(page: number, size: number, order: string, orderBy: string): Observable<EndUserPage> {
    return this.http.post<BaseResponse>('/dss/user/enduserlist', {
      pageNum: page,
      pageSize: size,
      order,
      orderBy
    }).pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        return res.result || new EndUserPage(0, []);
      }),
      catchError(err => {
        return of(new EndUserPage(0, []));
      })
    );
  }
}
