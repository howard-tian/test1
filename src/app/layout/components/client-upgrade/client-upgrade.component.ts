import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../shared/modules/alert/services/alert.service';
import { ApkInfo, Device, DeviceDetail, DevicePage, DeviceCommand } from '../../../shared/models/device';
import { DeviceService } from '../../../shared/services/device.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DateTimePickerComponent } from '../datetime-picker/datetime-picker.component';
import { environment } from '../../../../environments/environment';
import { modelMap } from '../../../../config';

export interface UpgradeParameter {
  version: string;
  versionName: string;
  description: string;
  url: string;
  downloadTime: string;
  checkCode: string;
  upgradeTime: string;
}

@Component({
  selector: 'app-client-upgrade',
  templateUrl: './client-upgrade.component.html',
  styleUrls: ['./client-upgrade.component.scss']
})
export class ClientUpgradeComponent implements OnInit {

  upgradeParam: UpgradeParameter = {
    version: '',
    versionName: '',
    description: '',
    url: '',
    downloadTime: '',
    checkCode: '',
    upgradeTime: ''
  };

  apkList: ApkInfo[] = [];
  selectedApk: ApkInfo = {
    apkfile: '',
    versionCode: '',
    versionName: ''
  };
  modelSuffix = '';
  canSend = true;

  command: DeviceCommand;

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService,
    public deviceService: DeviceService,
    public alertService: AlertService,
    private dialogRef: MatDialogRef<ClientUpgradeComponent>,
    @Inject(MAT_DIALOG_DATA) public device: DeviceDetail) {
      this.command = {
        command: 'client_upgrade',
        keepState: false,
        parameter: this.upgradeParam,
        type: 'customcmd',
        uuid: this.device.uuid
      };
    }

  ngOnInit() {
    this.getApkList();
  }

  // getFakeApkList() {
  //   this.apkList = JSON.parse(`[
  //     {"apkfile": "2019110315371.apk", "versionCode": "2", "versionName": "1.0.1"},
  //     {"apkfile": "2019110514551.apk", "versionCode": "2", "versionName": "1.0.1"}]`);
  // }

  getApkList() {
    for (const [key, value] of modelMap.entries()) {
      if (this.device.model && this.device.model.toLowerCase().includes(key.toLowerCase())) {
        this.modelSuffix = value;
        break;
      }
    }

    this.deviceService.retrieveApkList().subscribe(
      res => {
        this.apkList = res;
        if (this.modelSuffix) {
          this.apkList.forEach(f => {
              f.apkfile = f.apkfile.replace('.apk', this.modelSuffix + '.apk');
          });
        }

        if (this.apkList.length > 0) {
          this.selectedApk = this.apkList[0];
        }
      },
      err => {
        this.apkList = [];
        console.log(err);
      }
    );
  }

  showDateTime() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 480;
    dialogConfig.data = new Date();

    return this.dialog.open(DateTimePickerComponent, dialogConfig);
  }

  showDownloadDateTime() {
    this.showDateTime().afterClosed().subscribe(res => this.upgradeParam.downloadTime = res || '');
  }

  showUpgradeDateTime() {
    this.showDateTime().afterClosed().subscribe(res => this.upgradeParam.upgradeTime = res || '');
  }

  setApkParam() {
    // const apk = this.apkList.find(v => v.apkfile === this.selectedApk);
    if (this.selectedApk) {
      this.upgradeParam.url = environment.apkUrl + `/${this.selectedApk.apkfile}`;
      this.upgradeParam.version = this.selectedApk.versionCode;
      this.upgradeParam.versionName = this.selectedApk.versionName;
    }
  }

  ok() {
    this.canSend = false;

    this.setApkParam();
    this.command.parameter = this.upgradeParam;
    this.deviceService.sendCommand(
      this.command.uuid,
      this.command.command,
      JSON.stringify(this.command.parameter),
      this.command.keepState,
      this.command.type).subscribe(
        v => {
          console.log('send command response:', v);
          this.alertService.create(
            'Send command',
            v ? 'success' : 'danger',
            10000,
            v ? 'Command has been sent.' : 'Send command failed!'
          );
        },
        err => {
          this.alertService.create(
            'Send command',
            'danger',
            10000,
            'Send command failed!'
          );
        },
        () => {
          this.canSend = true;
        });
    // this.dialogRef.close(this.command);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
