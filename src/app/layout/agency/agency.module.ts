import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgencyRoutingModule } from './agency-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { AgencyComponent } from './agency.component';
import { AgencyAddComponent } from './agency-add/agency-add.component';

import { MatDialogModule } from '@angular/material';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AgencyDetailComponent } from './agency-detail/agency-detail.component';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { SelectCustomerComponent } from './select-customer/select-customer.component';

@NgModule({
  declarations: [AgencyComponent, AgencyAddComponent, AgencyDetailComponent, AddUserComponent, SelectCustomerComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AgencyRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
    AgencyAddComponent,
    AddUserComponent,
    SelectCustomerComponent
  ]
})
export class AgencyModule { }
