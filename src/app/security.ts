import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Security {

  constructor(public http: HttpClient) {
   }

  getcertlist() {
    return this.http.get('/ciot/scep/getcertList');
  }
  getacert(key) {
    return this.http.get(`/ciot/scep/getcertinfo?filename=${key}`);
  }
  delcertlist(name) {
    return this.http.get(`/ciot/scep/removecert?filename=${name}`);
  }
}
