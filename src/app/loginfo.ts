import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LogIn {

  constructor(public http: HttpClient) {
   }


  login(json) {
    return this.http.post('/leez/v1/users/login', json, {headers : {'Authorization': ''}});
  }
  getUserInfo() {
    return this.http.get('/leez/v1/users/userinfo');
  }
}
