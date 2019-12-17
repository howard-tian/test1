import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { PageHeaderModule } from '../../shared';
import { SettingsApi } from '../../settings';
import { ImportDeviceComponent } from './import-device/import-device.component';

@NgModule({
    imports: [CommonModule, SettingsRoutingModule, PageHeaderModule,
        FormsModule,
        TranslateModule,
        MatDialogModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule],
    declarations: [SettingsComponent, ImportDeviceComponent],
    providers: [SettingsApi],
    entryComponents: [ImportDeviceComponent]
})
export class SettingsModule {}
