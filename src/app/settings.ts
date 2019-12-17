import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SettingsApi {

  constructor(public http: HttpClient) {
   }

  getSttingList() {
    return this.http.get('/ciot/setting/list');
  }
  getAsetting(key) {
    return this.http.get(`/ciot/setting/get/${key}`);
  }
  setAsetting(key, json) {
    return this.http.post(`/ciot/setting/set/${key}`, json);
  }
  uploadAPK(version, json) {
    return this.http.post(`/ciot/device/uploadFirmware/${version}`, json);
  }
}
