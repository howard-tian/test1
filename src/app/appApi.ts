import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './shared/services/user.service';

@Injectable()
export class AppApi {

  constructor(public http: HttpClient, public userService: UserService) {
   }

  getMyAppList() {
    return this.http.get('/auth-center/v2/apps/createdapplist');
  }

  uploadImage(formData) {
    return this.http.post('/auth-center/v2/apps/uploadimage', formData);
  }

  getAppInfo(id) {
    return this.http.get(`/auth-center/v2/apps/appinfo/${id}`);
  }

  addApp(json) {
    return this.http.post('/auth-center/v2/apps/add', json);
  }

  updateApp(json) {
    return this.http.put('/auth-center/v2/apps/update', json);
  }

  updateStep(id, step) {
    return this.http.put(`/auth-center/v2/apps/${id}/step/${step}`, null);
  }

  buyApi() {
    return this.http.post('/auth-center/v2/users/buyapi', {apiId: 550, userId: this.userService.getCurrentUser().id});
  }

  addApi(appid) {
    return this.http.post(`/auth-center/v2/apps/${appid}/addapi`, {apiIds: [550]});
  }

  upLoadFile(file) {
    return this.http.post(`/auth-center/v2/apps/${localStorage.getItem('appid')}/upload`, file);
  }

  sendEmail(obj) {
    return this.http.post('/auth-center/v2/apps/sendEmail', obj);
  }

  getCommonInfo() {
    return this.http.post('/auth-center/v2/commoninfo/querycommoninfo',
    {key: 'emailForAdminconfig_user'});
  }

  undoMyApp(id) {
    return this.http.put('/auth-center/v2/apps/${id}/updatestatetorecall',
    {});
  }
}
