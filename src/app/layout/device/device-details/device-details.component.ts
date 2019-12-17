import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { DeviceService } from '../../../shared/services/device.service';
import { Device, DeviceDetail, DeviceCommand } from '../../../shared/models/device';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../shared/modules/alert/services/alert.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SendCommandComponent, SendCommandData } from '../../components/send-command/send-command.component';
import { ClientUpgradeComponent } from '../../components/client-upgrade/client-upgrade.component';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss'],
  animations: [routerTransition()]
})
export class DeviceDetailsComponent implements OnInit {
  DeviceDetail: DeviceDetail = {} as DeviceDetail;
  showtext = false;
  text = '';
  enroll = false;
  showupload = false;
  onetime;
  executionTime;
  upgradeTime;
  devicePropertyKeys: string[] = [];

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService,
    public deviceService: DeviceService,
    public router: Router,
    public alertService: AlertService) {}

  ngOnInit() {
    if (!sessionStorage.getItem('device-id')) {
      this.router.navigate(['/layout/device/device-list']);
    } else {
      this.getDeviceinfo(+sessionStorage.getItem('device-id'));
    }
  }

  upgrade() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 480;

    dialogConfig.data = this.DeviceDetail;

    const dialogRef = this.dialog.open(ClientUpgradeComponent, dialogConfig);
  }

  sencommand() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 480;

    dialogConfig.data = {
      device: this.DeviceDetail,
      command: {
        command: 'devicecontrol',
        keepState: true,
        parameter: {
          angle: 0,
          operation: 'none',
          volume: 50
        },
        type: 'customcmd',
        uuid: this.DeviceDetail.uuid
      }
    } as SendCommandData;

    this.dialog.open(SendCommandComponent, dialogConfig);
  }

  getDeviceinfo(id: number) {
    this.deviceService.get(id).subscribe(detail => {
      this.DeviceDetail = detail;
      this.devicePropertyKeys = Object.keys(this.DeviceDetail);
    });
  }
  getOneTime() {
    const nowTime = new Date();
    const yy = nowTime.getFullYear();
    const MM = (nowTime.getMonth() + 1) < 10 ? `0${nowTime.getMonth() + 1}` : nowTime.getMonth() + 1;
    const dd = nowTime.getDate() < 10 ? `0${nowTime.getDate()}` : nowTime.getDate();
    const hh = nowTime.getHours() < 10 ? `0${nowTime.getHours()}` : nowTime.getHours();
    const mm = nowTime.getMinutes() < 10 ? `0${nowTime.getMinutes()}` : nowTime.getMinutes();
    const ss = nowTime.getSeconds() < 10 ? `0${nowTime.getSeconds()}` : nowTime.getSeconds();
    this.onetime = `${yy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
    this.executionTime = this.onetime;
    this.upgradeTime = this.onetime;
  }
  goback() {
    this.router.navigate(['/layout/device/device-list']);
  }

  unenroll(uuid) {
    if (confirm('Are you sure you want to delete the device?')) {
      this.deviceService.unenroll(uuid).subscribe(res => {
        if (res) {
          this.goback();
        } else {
          this.alertService.create(
            'Delete device',
            'danger',
            10000,
            'Failed!'
          );
        }
      });
    }
  }

  delete(uuid) {
    if (confirm('Are you sure you want to delete the device?')) {
      this.deviceService.delete(uuid).subscribe(res => {
        if (res) {
          this.goback();
        } else {
          this.alertService.create(
            'Delete device',
            'danger',
            10000,
            'Failed!'
          );
        }
      });
    }
  }

  // timestamp
  add0(m) {
    return m < 10 ? '0' + m : m;
  }
  format(shijianchuo) {
    const time = new Date(shijianchuo);
    const y = time.getFullYear();
    const m = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    const mm = time.getMinutes();
    const s = time.getSeconds();
    return y + '/' + this.add0(m) + '/' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
  }
}
