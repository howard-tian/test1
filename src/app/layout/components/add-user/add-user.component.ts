import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Agency } from '../../agency/agency';
import { AgencyService } from '../../agency/agency.service';
import { Customer } from '../../customer/customer';
import { CustomerService } from '../../customer/customer.service';
import { AlertService } from '../../../shared/modules/alert/services/alert.service';
import { EndUser } from '../../end-user/end-user';
import { EndUserService } from '../../end-user/end-user.service';

export interface AddUserData {
  type: string;
  data: any;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  selectedUserIndex = 0;
  users: EndUser[] = [];
  selectFormControl = new FormControl('', Validators.required);

  constructor(
    private translate: TranslateService,
    public agencyService: AgencyService,
    public endUserService: EndUserService,
    public customerService: CustomerService,
    public alertService: AlertService,
    private dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddUserData) { }

  ngOnInit() {
    this.endUserService.getPage(1, 1000, 'asc', 'username').subscribe(
      res => {
        this.users = res.payload;
      }
    );
  }

  save() {
    switch (this.data.type) {
      case 'agency':
        return this.addAgencyUser(this.data.data);
      case 'customer':
          return this.addCustomerUser(this.data.data);
    }
  }

  addAgencyUser(agency: Agency) {
    this.agencyService.addUser(agency.id, this.users[this.selectedUserIndex].id).subscribe(
      res => {
        if (res) {
          this.dialogRef.close(res);
        } else {
          this.alertService.create(
            'Add user',
            'danger',
            10000,
            'Failed!'
          );
        }
      }
    );
  }

  addCustomerUser(customer: Customer) {
    this.customerService.addUser(customer.id, this.users[this.selectedUserIndex].id).subscribe(
      res => {
        if (res) {
          this.dialogRef.close(res);
        } else {
          this.alertService.create(
            'Add user',
            'danger',
            10000,
            'Failed!'
          );
        }
      }
    );
  }

  close() {
    this.dialogRef.close(false);
  }
}
