import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DeviceDetailsRoutingModule } from './device-details-routing.module';
import { DeviceDetailsComponent } from './device-details.component';
import { PageHeaderModule } from '../../../shared';
import { SharedPipesModule } from '../../../shared/pipes/shared-pipes.module';

@NgModule({
    imports: [
      TranslateModule,
      CommonModule,
      DeviceDetailsRoutingModule,
      PageHeaderModule,
      SharedPipesModule],
    declarations: [DeviceDetailsComponent],
    providers: [

    ]
})
export class DeviceDetailsModule {}
