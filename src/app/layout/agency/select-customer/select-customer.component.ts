import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Agency } from '../../agency/agency';
import { AgencyService } from '../../agency/agency.service';
import { Customer } from '../../customer/customer';
import { CustomerService } from '../../customer/customer.service';
import { AlertService } from '../../../shared/modules/alert/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

export interface SelectCustomerData {
  type: string;
  data: any;
}

@Component({
  selector: 'app-select-customer',
  templateUrl: './select-customer.component.html',
  styleUrls: ['./select-customer.component.scss']
})
export class SelectCustomerComponent implements OnInit {

  selectedCustomerIndex = 0;
  customers: Customer[] = [];
  selectFormControl = new FormControl('', Validators.required);

  constructor(
    private translate: TranslateService,
    public agencyService: AgencyService,
    public customerService: CustomerService,
    public alertService: AlertService,
    private dialogRef: MatDialogRef<SelectCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectCustomerData) {

  }

  ngOnInit() {
    this.customerService.getPage(1, 1000, 'asc', 'name').subscribe(
      res => {
        this.customers = res.payload;
      }
    );
  }

  save() {
    const selectedCustomer = this.customers[this.selectedCustomerIndex];
    if (selectedCustomer) {
      const agency: Agency = this.data.data;
      this.agencyService.addCustomer(agency.id, selectedCustomer).subscribe(
        res => {
          if (res) {
            this.dialogRef.close(res);
          } else {
            this.alertService.create(
              'Add customer',
              'danger',
              10000,
              'Failed!'
            );
          }
        }
      );
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
