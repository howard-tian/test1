import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Device, DeviceDetail, DeviceCommand } from '../../../shared/models/device';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UserService } from '../../../shared/services/user.service';
import { DeviceService } from '../../../shared/services/device.service';
import { SendCommandComponent, SendCommandData } from '../../components/send-command/send-command.component';

@Component({
    selector: 'app-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.scss'],
    animations: [routerTransition()]
})
export class DeviceListComponent implements OnInit {
    DeviceLists: Device[] = [];
    showadd = false;
    showaddping = false;
    showType = 1;
    json = {
      mobile: '',
      model: '',
      name: '',
      os: '',
      status: 0,
      uuid: ''
    };
    showtext = false;
    text = '';
    pagelist: number[] = [];

    pageSize = 10;
    curPage = 1;
    order = 'desc';
    orderby = 'id';

    constructor(
      private dialog: MatDialog,
      private translate: TranslateService,
      public deviceService: DeviceService,
      public router: Router,
      public userService: UserService) {}

    ngOnInit() {
      sessionStorage.removeItem('enroll');
      if (this.userService.isLoggedIn()) {
        this.getDeviceList(1);
      }
    }

    getDeviceList(page: number) {
      this.deviceService.getDevicePage(page, this.pageSize, this.order, this.orderby).subscribe(
        res => {
          this.DeviceLists = res.payload;

          const cnt = Math.ceil(res.count / this.pageSize);
          this.pagelist.length = 0;
          for (let i = 1; i <= cnt; i++) {
            this.pagelist.push(i);
          }

          this.curPage = page;
        }
      );
    }

    unenroll(uuid) {
      if (confirm('Are you sure you want to cancel the enroll?')) {
        this.deviceService.unenroll(uuid).subscribe(res => {
          this.getDeviceList(this.curPage);

          if (res) {
            this.text = 'Successful operation';
          } else {
            this.text = 'operation failed';
          }

          this.showtext = true;
          setTimeout(() => {
            this.text = '';
            this.showtext = false;
          }, 1800);
        });
      }
    }

    goDeviceDetails(id, bl) {
      if (bl === true) {
        sessionStorage.setItem('enroll', '1');
      }
      sessionStorage.setItem('device-id', id);
      this.router.navigate(['/layout/device/device-details']);
    }

    goDeviceEdit(id, bl) {
      if (bl === true) {
        sessionStorage.setItem('enroll', '1');
      }
      sessionStorage.setItem('uuid', id);
      this.router.navigate(['/layout/device/device-edit']);
    }

    sencommand(text, device) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.minWidth = 480;

      dialogConfig.data = {
        device: device,
        command: {
          command: 'devicecontrol',
          keepState: true,
          parameter: {
            angle: 0,
            operation: 'none',
            volume: 50
          },
          type: 'customcmd',
          uuid: device.uuid
        }
      } as SendCommandData;

      this.dialog.open(SendCommandComponent, dialogConfig);
    }

    changeType(n) {
      this.showType = n;
    }
}
