import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DeviceService } from '../../shared/services/device.service';
import { UserService } from '../../shared/services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()]
})
export class HomeComponent implements OnInit {
    public pieChartLabels: string[] = [
        this.translate.instant('online'),
        this.translate.instant('offline')
    ];
    public pieChartData = [];
    public pieChartType: string;
    constructor(private translate: TranslateService, public deviceService: DeviceService, public user: UserService) {}

    ngOnInit() {
      if (this.user.isLoggedIn()) {
        this.getDevices();
      }
    }

    getDevices() {
      // this.deviceService.getAll().subscribe(devices => {
      //   this.pieChartData[0] = devices.filter(dev => dev.status > 0).length;
      //   this.pieChartData[1] = devices.filter(dev => dev.status === 0).length;
      //   this.pieChartType = 'pie';
      // });

      this.deviceService.getDevicePage(1, 1000, 'desc', 'id').subscribe(
        res => {
          if (res) {
            this.pieChartData[0] = res.payload.filter(dev => dev.status > 0).length;
            this.pieChartData[1] = res.payload.filter(dev => dev.status === 0).length;
            this.pieChartType = 'pie';
          }
        }
      );
    }
}
