import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseResponse } from '../models/base-res';
import { ApkInfo, Device, DeviceDetail, DevicePage } from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(public http: HttpClient) { }

  getDevicePage(page: number, size: number, order: string, orderBy: string): Observable<DevicePage> {
    return this.http.post<BaseResponse>('/dss/device/deviceListForAdmin', {
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
        return of(new DevicePage(0, []));
      })
    );
  }

  getAll(): Observable<Device[]> {
    return this.http.get<BaseResponse>('/dss/device/list').pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          return [];
        }

        return res.result;
      }),
      catchError(err => {
        return of([]);
      })
    );
  }

  get(id: number): Observable<DeviceDetail> {
    return this.http.get<BaseResponse>(`/dss/device/deviceInfoForAdmin/${id}`).pipe(
      map(res => {
        if (res.status.toLowerCase() !== 'ok') {
          return null;
        }

        return res.result;
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  delete(uuid: string): Observable<boolean> {
    return this.http.delete<BaseResponse>(`/dss/device/deleteDeviceForAdmin/${uuid}`).pipe(
      map(res => {
        return res.status.toLowerCase() === 'ok';
      }),
      catchError(err => {
        return of(false);
      })
    );
  }

  unenroll(uuid: string): Observable<boolean> {
    return this.http.post<BaseResponse>(`/dss/device/unenroll/${uuid}`, {}).pipe(
      map(res => {
        return res.status.toLowerCase() === 'ok';
      }),
      catchError(err => {
        return of(false);
      })
    );
  }

  uploadApk(version: string, file: FormData): Observable<string> {
    return this.http.post<BaseResponse>(`/dss/device/uploadApk/${version}`, file).pipe(
      map(res => {
        if (res.status.toLowerCase() === 'ok') {
          return res.result;
        } else {
          return '';
        }
      }),
      catchError(err => {
        return of('');
      })
    );
  }

  Import(proxyId: number, file: FormData): Observable<string> {
    return this.http.post<BaseResponse>(`/dss/device/batchImportDevice/${proxyId}`, file).pipe(
      map(res => {
        if (res.status.toLowerCase() === 'ok') {
          return res.result;
        } else {
          return null;
        }
      }),
      catchError(err => {
        return of(null);
      })
    );
  }

  retrieveApkList(): Observable<ApkInfo[]> {
    return this.http.get<ApkInfo[]>(environment.apkUrl + '/versions.json');
  }

  sendCommand(uuid: string, cmd: string, param = '', keepState = true, type = 'execute'): Observable<boolean> {
    const config = {
      command: cmd,
      keepState: keepState,
      parameter: param,
      type: type,
      uuid: uuid
    };

    console.log(param);

    return this.http.post<BaseResponse>('/dss/command/sendForAdmin', config).pipe(
      map(res => {
        return res.status.toLowerCase() === 'ok';
      }),
      catchError(err => {
        return of(false);
      })
    );
  }
}
