import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { AgencyService } from '../agency.service';
import { Agency, AgencyUser, AgencyDialogData } from '../agency';
import { AddUserComponent, AddUserData } from '../../components/add-user/add-user.component';
import { AlertService } from '../../../shared/modules/alert/services/alert.service';
import { AgencyAddComponent } from '../agency-add/agency-add.component';
import { Customer, CustomerPage } from '../../customer/customer';
import { UserInfo } from '../../../shared/models/user';
import { UserService } from '../../../shared/services/user.service';
import { SelectCustomerComponent, SelectCustomerData } from '../select-customer/select-customer.component';

class NavItem {
  constructor(public id: number, public name: string) {}
}

@Component({
  selector: 'app-agency-detail',
  templateUrl: './agency-detail.component.html',
  styleUrls: ['./agency-detail.component.scss']
})
export class AgencyDetailComponent implements OnInit {

  navItems: NavItem[] = [];

  agency: Agency = {
    id: 0,
    name: '',
    description: ''
  };
  parentId = 0;

  subAgencies: Agency[] = [];
  subAgencyCount = 0;
  subAgencyPageSize = 10;
  subAgencyPages: number[] = [];
  subAgencyCurPage = 1;
  subAgencyOrder = 'desc';
  subAgencyOrderBy = 'id';

  customers: Customer[] = [];
  customerCount = 0;
  customerPageSize = 10;
  customerPages: number[] = [];
  customerCurPage = 1;
  customerOrder = 'desc';
  customerOrderBy = 'id';

  users: AgencyUser[] = [];
  userCount = 0;
  userPageSize = 10;
  userPages: number[] = [];
  userCurPage = 1;
  userOrder = 'desc';
  userOrderBy = 'id';

  constructor(
    private translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
    public agencyService: AgencyService,
    public alertService: AlertService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.showData();
  }

  showNavBar() {
    this.route.queryParamMap.subscribe(queryParams => {
      if (queryParams.get('parent')) {
        this.parentId = +queryParams.get('parent');
      } else {
        this.parentId = 0;
      }

      const ids: string[] = queryParams.getAll('id');
      const names: string[] = queryParams.getAll('name');

      this.navItems.length = 0;
      for (let i = 0; i < ids.length; i++) {
        const id = +ids[i];
        if (id !== this.agency.id) {
          this.navItems.push(new NavItem(id, names[i]));
        }
      }
    });
  }

  showData() {
    this.route.paramMap.subscribe(params => {
      this.agencyService.get(+params.get('id')).subscribe(
        res => {
          if (res) {
            this.agency = res;
            this.getSubAgencyPage(this.subAgencyCurPage);
            this.getSubCustomerPage(this.customerCurPage);
            this.getUserPage(this.userCurPage);

            this.showNavBar();
          }
        }
      );
    });
  }

  editAgency() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 480;

    dialogConfig.data = new AgencyDialogData(
      'edit',
      {
        id: this.agency.id,
        name: this.agency.name,
        description: this.agency.description
      },
      this.parentId
    );

    const dialogRef = this.dialog.open(AgencyAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.agency = res;
        }
      }
    );
  }

  getSubAgencyPage(page: number) {
    this.agencyService.getSubAgencyPage(this.agency.id, page, this.subAgencyPageSize, this.subAgencyOrder, this.subAgencyOrderBy).subscribe(
      res => {
        this.subAgencies = res.payload;
        this.subAgencyCount = res.count;

        const cnt = Math.ceil(res.count / this.subAgencyPageSize);
        this.subAgencyPages.length = 0;
        for (let i = 1; i <= cnt; i++) {
          this.subAgencyPages.push(i);
        }

        this.subAgencyCurPage = page;
      }
    );
  }

  getSubCustomerPage(page: number) {
    this.agencyService.getSubCustomerPage(this.agency.id, page, this.customerPageSize, this.customerOrder, this.customerOrderBy).subscribe(
      res => {
        this.customers = res.payload;
        this.customerCount = res.count;

        const cnt = Math.ceil(res.count / this.customerPageSize);
        this.customerPages.length = 0;
        for (let i = 1; i <= cnt; i++) {
          this.customerPages.push(i);
        }

        this.customerCurPage = page;
      }
    );
  }

  getUserPage(page: number) {
    this.agencyService.getAgencyUserPage(this.agency.id, page, this.userPageSize, this.userOrder, this.userOrderBy).subscribe(
      res => {
        this.users = res.payload;
        this.userCount = res.count;

        const cnt = Math.ceil(res.count / this.userPageSize);
        this.userPages.length = 0;
        for (let i = 1; i <= cnt; i++) {
          this.userPages.push(i);
        }

        this.userCurPage = page;
      }
    );
  }

  goback() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  goAgency(agencyId: number) {
    const ids: number[] = [];
    const names: string[] = [];

    for (let i = 0; i < this.navItems.length; i++) {
      ids.push(this.navItems[i].id);
      names.push(this.navItems[i].name);

      if (agencyId === this.navItems[i].id) {
        break;
      }
    }

    const pos = this.navItems.findIndex(v => v.id === agencyId);
    let parent = 0;
    if (pos > 0) {
      parent = this.navItems[pos - 1].id;
    }
    this.router.navigate(
      [`../${agencyId}`],
      {
        queryParams: {parent, id: ids, name: names},
        relativeTo: this.route,
        queryParamsHandling: 'merge'
      }
    );
  }

  goSubAgency(subAgencyId: number) {
    const ids: number[] = [];
    const names: string[] = [];

    this.navItems.forEach(item => {
      ids.push(item.id);
      names.push(item.name);
    });

    ids.push(this.agency.id);
    names.push(this.agency.name);

    this.router.navigate(
      [`../${subAgencyId}`],
      {
        queryParams: {parent: this.agency.id, id: ids, name: names},
        relativeTo: this.route,
        queryParamsHandling: 'merge'
      }
    );
  }

  goUser(userId: number) {
    this.router.navigate([`../../endusers`], { relativeTo: this.route });
  }

  goCustomer(customerId: number) {
    this.router.navigate([`../../customers/${customerId}`], { relativeTo: this.route });
  }

  addUser() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 480;

    dialogConfig.data = {
      type: 'agency',
      data: this.agency
    } as AddUserData;

    const dialogRef = this.dialog.open(AddUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      success => {
        if (success) {
          this.getUserPage(this.userCurPage);
        }
      }
    );
  }

  removeUser(userId: number) {
    if (confirm('Are you sure to remove the user from this agency?')) {
      this.agencyService.removeUser(this.agency.id, userId).subscribe(
        res => {
          this.getUserPage(this.userCurPage);
        }
      );
    }
  }

  addCustomer() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 480;

    dialogConfig.data = {
      type: 'agency',
      data: this.agency
    } as SelectCustomerData;

    const dialogRef = this.dialog.open(SelectCustomerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      success => {
        if (success) {
          this.getSubCustomerPage(this.customerCurPage);
        }
      }
    );
  }

  removeCustomer(customer: Customer) {
    if (confirm('Are you sure to remove the customer from this agency?')) {
      this.agencyService.removeCustomer(customer).subscribe(
        res => {
          this.getSubCustomerPage(this.customerCurPage);
        }
      );
    }
  }

  createSubAgency() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 480;

    dialogConfig.data = new AgencyDialogData(
      'newSub',
      {
        id: this.agency.id,
        name: '',
        description: ''
      },
      this.parentId
    );

    const dialogRef = this.dialog.open(AgencyAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      res => {
        if (res) {
          this.getSubAgencyPage(this.subAgencyCurPage);
        }
      }
    );
  }

  delete() {
    if (confirm('Are you sure to delete the agency?')) {
      this.agencyService.delete(this.agency.id).subscribe(
        res => {
          if (res) {
            if (this.parentId) {
              this.goAgency(this.parentId);
            } else {
              this.goback();
            }
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
