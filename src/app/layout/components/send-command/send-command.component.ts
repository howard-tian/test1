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

export interface DeviceControlParameter {
  angle: number;
  operation: string;
  volume: number;
}

export interface UpgradeParameter {
  version: string;
  versionName: string;
  description: string;
  url: string;
  downloadTime: string;
  checkCode: string;
  upgradeTime: string;
}

export interface OnOffParameter {
  on: string;
  off: string;
}

export interface SendCommandData {
  device: Device;
  command: DeviceCommand;
}

@Component({
  selector: 'app-send-command',
  templateUrl: './send-command.component.html',
  styleUrls: ['./send-command.component.scss']
})
export class SendCommandComponent implements OnInit {

  // cmdParam: CommandParameter = {
  //   angle: 0,
  //   operation: 'none',
  //   volume: 50
  // };
  commandOptions = [
    'devicecontrol',
    'client_download',
    'client_upgrade',
    'setonoff',
    'restart',
    'shutdown'
  ];

  operationOptions = [
    'none',
    'restart',
    'update'
  ];

  angleOptions = [
    0,
    90,
    180,
    270
  ];

  upgradeParam: UpgradeParameter = {
    version: '',
    versionName: '',
    description: '',
    url: '',
    downloadTime: '',
    checkCode: '',
    upgradeTime: ''
  };

  onOffParam: OnOffParameter = {
    on: '',
    off: ''
  };

  apkList: ApkInfo[] = [];
  selectedApk: ApkInfo = {
    apkfile: '',
    versionCode: '',
    versionName: ''
  };
  modelSuffix = '';
  canSend = true;

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService,
    public deviceService: DeviceService,
    public alertService: AlertService,
    private dialogRef: MatDialogRef<SendCommandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SendCommandData) {}

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
      if (this.data.device.model.toLowerCase().includes(key.toLowerCase())) {
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

  showOnDateTime() {
    this.showDateTime().afterClosed().subscribe(res => this.onOffParam.on = res || '');
  }

  showOffDateTime() {
    this.showDateTime().afterClosed().subscribe(res => this.onOffParam.off = res || '');
  }

  setApkParam() {
    if (this.selectedApk) {
      this.upgradeParam.url = environment.apkUrl + `/${this.selectedApk.apkfile}`;
      this.upgradeParam.version = this.selectedApk.versionCode;
      this.upgradeParam.versionName = this.selectedApk.versionName;
    }
  }

  ok() {
    this.canSend = false;

    switch (this.data.command.command) {
      case 'devicecontrol':
        break;
      case 'client_upgrade':
        this.setApkParam();
        this.data.command.parameter = this.upgradeParam;
        break;
      case 'setonoff':
        this.data.command.parameter = this.onOffParam;
        break;
      default:
        this.data.command.parameter = {};
    }

    this.deviceService.sendCommand(
      this.data.command.uuid,
      this.data.command.command,
      JSON.stringify(this.data.command.parameter),
      this.data.command.keepState,
      this.data.command.type).subscribe(
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
