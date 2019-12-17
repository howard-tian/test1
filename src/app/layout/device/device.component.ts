import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss'],
    animations: [routerTransition()]
})
export class DeviceComponent implements OnInit {
    constructor(private translate: TranslateService) {}

    ngOnInit() {}
}
