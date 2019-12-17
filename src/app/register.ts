import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Register {

  constructor(public http: HttpClient) {}

  register(json) {
    return this.http.post('/leez/v1/users/register', json, { headers: { Authorization: '' } });
  }
  getuserinfo() {
    return this.http.get('/leez/v1/users/userinfo');
  }
  sendemail(json) {
    return this.http.post('/leez/v1/users/sendValidEmail', json);
  }
  checkemail(json) {
    return this.http.put(`/leez/v1/users/checkEmail/${json}`, {}, {headers : {'Authorization': ''}});
  }
  emailIdentityCode(source,email) {
    return this.http.post(`/leez/v1/users/emailIdentityCode/${source}/${email}`, {});
  }
  resetPwd(json) {
    return this.http.post('/leez/v1/users/resetPwd', json);
  }
}
