import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DeviceRoutingModule } from './device-routing.module';
import { DeviceComponent } from './device.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule,
         MatCheckboxModule,
         MatRadioModule,
         MatFormFieldModule,
         MatInputModule,
         MatSliderModule,
         MatSelectModule } from '@angular/material';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateTimePickerComponent } from '../components/datetime-picker/datetime-picker.component';
import { SendCommandComponent } from '../components/send-command/send-command.component';
import { ClientUpgradeComponent } from '../components/client-upgrade/client-upgrade.component';

@NgModule({
  imports: [
    TranslateModule,
    FormsModule,
    CommonModule,
    NgbModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    DeviceRoutingModule,
    PageHeaderModule],
  declarations: [
    DeviceComponent,
    SendCommandComponent,
    ClientUpgradeComponent,
    DateTimePickerComponent],
  entryComponents: [
    DateTimePickerComponent,
    SendCommandComponent,
    ClientUpgradeComponent
  ]
})
export class DeviceModule {}
