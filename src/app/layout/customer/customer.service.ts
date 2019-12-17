import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseResponse } from '../../shared/models/base-res';
import { Customer, CustomerPage, CustomerProxyUser } from './customer';
import { ProxyUser } from '../proxy-user/proxy-user';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public http: HttpClient) { }

  get(id: number): Observable<Customer> {
    return this.http.get<BaseResponse>(`/dss/agency/customerInfo/${id}`).pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        return res.result;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  getPage(page: number, size: number, order: string, orderBy: string): Observable<CustomerPage> {
    return this.http.post<BaseResponse>('/dss/agency/listAllCustomers', {
      pageNum: page,
      pageSize: size,
      order,
      orderBy
    }).pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        return res.result || new CustomerPage(0, []);
      }),
      catchError(err => {
        return of(new CustomerPage(0, []));
      })
    );
  }

  add(name: string, description: string, userId: number): Observable<boolean> {
    return this.http.post<BaseResponse>('/dss/agency/createCustomerAndAddProxy', {name, description, userId}).pipe(
      map(res => res.status.toLowerCase() === 'ok'),
      catchError(err => {
        return of(false);
      })
    );
  }

  addUser(customerId: number, userId: number): Observable<boolean> {
    return of(false);
  }

  getProxyUser(customerId: number, page: number, size: number, order: string, orderBy: string): Observable<CustomerProxyUser> {
    return this.http.post<BaseResponse>(`/dss/user/listUserByCustomer/${customerId}`, {
      pageNum: page,
      pageSize: size,
      order,
      orderBy
    }).pipe(
    map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          return of(null);
        } else {
          return res.result.payload[0];
        }
      },
      catchError(err => {
        return of(null);
      })
    ));
  }

  edit(customer: Customer): Observable<boolean> {
    return this.http.put<BaseResponse>('/dss/agency/updateCustomer', {
      agencyId: customer.id,
      name: customer.name,
      description: customer.description,
      parentId: 0
    }).pipe(
      map(res => res.status.toLowerCase() === 'ok'),
      catchError(err => {
        return of(false);
      })
    );
  }

  delete(id: number): Observable<boolean> {
    return this.http.request<BaseResponse>('delete', `/dss/agency/deleteCustomer/${id}`).pipe(
      map(res => res.status.toLowerCase() === 'ok'),
      catchError(err => {
        return of(false);
      })
    );
  }
}
