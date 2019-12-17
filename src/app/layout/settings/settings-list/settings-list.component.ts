import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { SettingsApi } from '../../../settings';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../shared/services/user.service';
import { DeviceService } from '../../../shared/services/device.service';
import { ImportDeviceComponent, ImportDeviceData } from '../import-device/import-device.component';

@Component({
    selector: 'app-settings-list',
    templateUrl: './settings-list.component.html',
    styleUrls: ['./settings-list.component.scss'],
    animations: [routerTransition()]
})
export class SettingsListComponent implements OnInit {
    settinglist = [];
    aService = {
      id: null,
      uid: null,
      serviceKey: '',
      payload: {
        smtpHost : '',
        smtpPWD : '',
        subject : '',
        smtpUserName : '',
        use : '',
        smtpPort : ''
       }
     };
    key = '';
    emailBox = false;
    showAPK = false;
    showXLS = false;
    APKversion = '';
    APKFlie;
    XLSFile;

    apkUrl = '';

    constructor(
      private dialog: MatDialog,
      private translate: TranslateService,
      public http: SettingsApi,
      public router: Router,
      public user: UserService,
      public deviceService: DeviceService) {

    }

    ngOnInit() {
      if (this.user.isLoggedIn()) {
        this.getSettingList();
      }
    }
    getAservice(con) {
      sessionStorage.setItem('key', con.service);
      this.router.navigate([`/layout/settings/details`]);
    }
    getSettingList() {
      this.http.getSttingList().subscribe((res: any) => {
        if (res.status === 'OK') {
          this.settinglist = res.result;
        }
      });
    }
    uploadfile(e) {
      if (e.files[0].name.indexOf('.apk') !== -1) {
        this.APKFlie = e.files[0];
      }
    }
    uploadAPK() {
      if (this.APKFlie && this.APKversion) {
        const formData = new FormData();
        formData.append('file', this.APKFlie);
        this.deviceService.uploadApk(this.APKversion, formData).subscribe(res => {
          if (res) {
            this.showAPK = false;
            this.apkUrl = res;
          }
        });
      }
    }
    importfile(e) {
      this.XLSFile = e.files[0];
    }
    uploadXLS() {
      if (this.XLSFile) {
        const formData = new FormData();
        formData.append('file', this.XLSFile);
        // this.deviceService.Import(formData).subscribe(res => {
        //   if (res) {
        //     this.showXLS = false;
        //   }
        // });
      }
    }

    importDevices() {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.minWidth = 480;

      dialogConfig.data = {
        type: 'new',
        data: {
          id: null,
          name: '',
          description: ''
        }
      };

      const dialogRef = this.dialog.open(ImportDeviceComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        res => {
          if (res) {

          }
        }
      );
    }
}
