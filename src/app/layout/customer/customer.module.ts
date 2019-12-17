import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CustomerListComponent, CustomerAddComponent, CustomerDetailComponent],
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
    CustomerAddComponent
  ]
})
export class CustomerModule { }
