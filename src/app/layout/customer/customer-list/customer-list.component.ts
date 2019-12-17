import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Customer, CustomerPage, CustomerDialogData } from '../customer';
import { UserService } from '../../../shared/services/user.service';
import { CustomerAddComponent } from '../customer-add/customer-add.component';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  admin = false;
  customerPage: CustomerPage = {
    count: 0,
    payload: []
  };

  pageSize = 10;
  pages: number[] = [1];
  curPage = 1;
  order = 'desc';
  orderby = 'id';

  constructor(
    private translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public customerService: CustomerService,
    private dialog: MatDialog) {
    this.admin = this.userService.isAdmin();
  }

  ngOnInit() {
    this.getPage(this.curPage);
  }

  getPage(page: number) {
    this.customerService.getPage(page, this.pageSize, this.order, this.orderby).subscribe(
      res => {
        this.customerPage = res;

        const cnt = Math.ceil(res.count / this.pageSize);
        this.pages.length = 0;
        for (let i = 1; i <= cnt; i++) {
          this.pages.push(i);
        }

        this.curPage = page;
      }
    );
  }

  create() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 480;

    dialogConfig.data = new CustomerDialogData(
      'new',
      {
        id: null,
        name: '',
        description: ''
      }
    );

    const dialogRef = this.dialog.open(CustomerAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.getPage(this.curPage);
        }
      }
    );
  }

  goDetail(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
