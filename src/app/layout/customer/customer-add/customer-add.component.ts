import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Customer, CustomerDialogData } from '../customer';
import { CustomerService } from '../customer.service';

import { AlertService } from '../../../shared/modules/alert/services/alert.service';
import { ProxyUser } from '../../proxy-user/proxy-user';
import { ProxyUserService } from '../../proxy-user/proxy-user.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  title = '';
  proxyUsers: ProxyUser[] = [];
  selectFormControl = new FormControl('', Validators.required);
  selectedProxyUserIndex = 0;

  constructor(
    private translate: TranslateService,
    public customerService: CustomerService,
    public proxyUserService: ProxyUserService,
    public alertService: AlertService,
    private dialogRef: MatDialogRef<CustomerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CustomerDialogData) { }

  ngOnInit() {
    switch (this.data.command) {
      case 'new':
        this.title = this.translate.instant('New customer');
        this.proxyUserService.getPage(1, 1000, 'asc', 'username').subscribe(
          res => {
            this.proxyUsers = res.payload;
          }
        );
        break;
      case 'edit':
          this.title = this.translate.instant('Edit customer');
        break;
    }
  }

  newCustomer() {
    this.customerService.add(this.data.customer.name, this.data.customer.description, this.proxyUsers[this.selectedProxyUserIndex].id).subscribe(
      res => {
        if (res) {
          this.dialogRef.close(this.data.customer);
        } else {
          this.alertService.create(
            'Create customer',
            'danger',
            10000,
            'Failed!'
          );
        }
      }
    );
  }

  editCustomer() {
    this.customerService.edit(this.data.customer).subscribe(
      res => {
        if (res) {
          this.dialogRef.close(this.data.customer);
        } else {
          this.alertService.create(
            'Edit customer',
            'danger',
            10000,
            'Failed!'
          );
        }
      }
    );
  }

  ok() {
    switch (this.data.command) {
      case 'new':
        this.newCustomer();
        break;
      case 'edit':
        this.editCustomer();
        break;
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
