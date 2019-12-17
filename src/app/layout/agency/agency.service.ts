import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BaseResponse } from '../../shared/models/base-res';
import { Agency, AgencyPage, AgencyUserPage } from './agency';
import { Customer, CustomerPage } from '../customer/customer';
import { EndUser } from '../end-user/end-user';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(public http: HttpClient) { }

  get(id: number): Observable<Agency> {
    return this.http.get<BaseResponse>(`/dss/agency/agencyInfo/${id}`).pipe(
      map(res => {
        if (res.status.toLowerCase() === 'ok') {
          return res.result;
        }
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  getPage(page: number, size: number, order: string, orderBy: string): Observable<AgencyPage> {
    return this.http.post<BaseResponse>('/dss/agency/listTopAgencies', {
      pageNum: page,
      pageSize: size,
      order,
      orderBy
    }).pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        return res.result || new AgencyPage(0, []);
      }),
      catchError(err => {
        return of(new AgencyPage(0, []));
      })
    );
  }

  getSubCustomerPage(parentId: number, page: number, size: number, order: string, orderBy: string): Observable<CustomerPage> {
    return this.http.post<BaseResponse>(`/dss/agency/listSubCustomers/${parentId}`, {
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

  getSubAgencyPage(parentId: number, page: number, size: number, order: string, orderBy: string): Observable<AgencyPage> {
    return this.http.post<BaseResponse>(`/dss/agency/listSubAgencies/${parentId}`, {
      pageNum: page,
      pageSize: size,
      order,
      orderBy
    }).pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        return res.result || new AgencyPage(0, []);
      }),
      catchError(err => {
        return of(new AgencyPage(0, []));
      })
    );
  }

  add(name: string, description: string, parentId: number): Observable<boolean> {
    return this.http.post<BaseResponse>('/dss/agency/addAgency', {agencyId: 0, name, description, parentId: parentId || 0}).pipe(
      map(res => res.status.toLowerCase() === 'ok'),
      catchError(err => {
        return of(false);
      })
    );
  }

  delete(agencyId: number): Observable<boolean> {
    return this.http.request<BaseResponse>('delete', `/dss/agency/deleteAgency/${agencyId}`).pipe(
      map(res => res.status.toLowerCase() === 'ok'),
      catchError(err => {
        return of(false);
      })
    );
  }

  getAgencyUserPage(agencyId: number, page: number, size: number, order: string, orderBy: string): Observable<AgencyUserPage> {
    return this.http.post<BaseResponse>(`/dss/user/listUserByAgency/${agencyId}`, {
      pageNum: page,
      pageSize: size,
      order,
      orderBy
    }).pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          throw res;
        }

        return res.result;
      }),
      catchError(err => {
        return of(new AgencyUserPage(0, []));
      })
    );
  }

  addCustomer(parentId: number, customer: Customer): Observable<boolean> {
    return this.http.put<BaseResponse>(
      '/dss/agency/updateCustomer',
      {
        agencyId: customer.id,
        description: customer.description,
        name: customer.name,
        parentId
      }
    ).pipe(
      map(res => res.status.toLowerCase() === 'ok'),
      catchError(err => {
        return of(false);
      })
    );
  }

  removeCustomer(customer: Customer): Observable<boolean> {
    return this.http.put<BaseResponse>(
      '/dss/agency/updateCustomer',
      {
        agencyId: customer.id,
        description: customer.description,
        name: customer.name,
        parentId: 0
      }
    ).pipe(
      map(res => res.status.toLowerCase() === 'ok'),
      catchError(err => {
        return of(false);
      })
    );
  }

  addUser(agencyId: number, userId: number): Observable<boolean> {
    return this.http.post<BaseResponse>('/dss/agency/addUserToAgency', {agencyId, userId}).pipe(
      map(res => res.status.toLowerCase() === 'ok'),
      catchError(err => {
        return of(false);
      })
    );
  }

  removeUser(agencyId: number, userId: number): Observable<boolean> {
    return this.http.post<BaseResponse>(
      '/dss/agency/removeUserFromAgency',
      {
        agencyId, userId
      }
    ).pipe(
      map(res => res.status.toLowerCase() === 'ok'),
      catchError(err => {
        return of(false);
      })
    );
  }

  edit(agency: Agency, parent: number): Observable<boolean> {
    return this.http.put<BaseResponse>('/dss/agency/updateAgency', {
      agencyId: agency.id,
      name: agency.name,
      description: agency.description,
      parentId: 0
    }).pipe(
      map(res => res.status.toLowerCase() === 'ok'),
      catchError(err => {
        return of(false);
      })
    );
  }
}
