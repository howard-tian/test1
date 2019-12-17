import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsListRoutingModule } from './settings-list-routing.module';
import { SettingsListComponent } from './settings-list.component';
import { PageHeaderModule } from '../../../shared';
import { SettingsApi } from '../../../settings';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [TranslateModule, FormsModule, CommonModule, SettingsListRoutingModule, PageHeaderModule],
    declarations: [SettingsListComponent],
    providers: [SettingsApi]
})
export class SettingsListModule {}
