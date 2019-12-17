import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseResponse } from '../../shared/models/base-res';
import { ProxyUser, ProxyUserPage } from './proxy-user';

@Injectable({
  providedIn: 'root'
})
export class ProxyUserService {

  constructor(public http: HttpClient) { }

  getPage(page: number, size: number, order: string, orderBy: string): Observable<ProxyUserPage> {
    return this.http.post<BaseResponse>('/dss/user/proxylist', {
      pageNum: page,
      pageSize: size,
      order,
      orderBy
    }).pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        return res.result || new ProxyUserPage(0, []);
      }),
      catchError(err => {
        return of(new ProxyUserPage(0, []));
      })
    );
  }
}
