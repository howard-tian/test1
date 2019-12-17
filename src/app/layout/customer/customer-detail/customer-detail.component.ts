import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertService } from '../../../shared/modules/alert/services/alert.service';

import { Customer, CustomerPage, CustomerDialogData } from '../customer';
import { UserService } from '../../../shared/services/user.service';
import { CustomerAddComponent } from '../customer-add/customer-add.component';
import { CustomerService } from '../customer.service';
import { EndUser } from '../../end-user/end-user';
import { CustomerProxyUser } from '../customer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
    public alertService: AlertService,
    public userService: UserService,
    public customerService: CustomerService) {

  }

  customer: Customer = null;

  proxyUser: CustomerProxyUser = null;

  users: EndUser[] = [];
  userCount = 0;
  userPageSize = 10;
  userPages: number[] = [];
  userCurPage = 1;
  userOrder = 'desc';
  userOrderBy = 'id';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.customerService.get(+params.get('id')).subscribe(
        res => {
          this.customer = res;
          this.customerService.getProxyUser(this.customer.id, 1, 100, 'asc', 'id').subscribe(v => this.proxyUser = v);
        }
      );
    });
  }

  goback() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  addUser() {
  }

  edit() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 480;

    dialogConfig.data = new CustomerDialogData(
      'edit',
      {
        id: this.customer.id,
        name: this.customer.name,
        description: this.customer.description
      }
    );

    const dialogRef = this.dialog.open(CustomerAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.customer = res;
        }
      }
    );
  }

  delete() {
    if (confirm('Are you sure to delete the agency?')) {
      this.customerService.delete(this.customer.id).subscribe(
        res => {
          if (res) {
            this.goback();
          } else {
            this.alertService.create(
              'Delete agency',
              'danger',
              10000,
              'Failed!'
            );
          }
        }
      );
    }
  }
}
