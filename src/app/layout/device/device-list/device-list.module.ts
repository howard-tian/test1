import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DeviceListRoutingModule } from './device-list-routing.module';
import { DeviceListComponent } from './device-list.component';
import { PageHeaderModule } from '../../../shared';

import { SharedPipesModule } from '../../../shared/pipes/shared-pipes.module';


@NgModule({
    imports: [
      TranslateModule,
      CommonModule,
      DeviceListRoutingModule,
      PageHeaderModule,
      SharedPipesModule
    ],
    declarations: [
      DeviceListComponent
    ],
    providers: [

    ]
})
export class DeviceListModule {}
