import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Agency, AgencyDialogData } from './agency';
import { AgencyService } from './agency.service';
import { UserService } from '../../shared/services/user.service';
import { AgencyAddComponent } from './agency-add/agency-add.component';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {

  admin = false;
  agencies: Agency[] = [];
  count = 0;

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
    public agencyService: AgencyService,
    private dialog: MatDialog
  ) {
      this.admin = this.userService.isAdmin();
  }

  ngOnInit() {
    this.getPage(this.curPage);
  }

  getPage(page: number) {
    this.agencyService.getPage(page, this.pageSize, this.order, this.orderby).subscribe(
      res => {
        this.agencies = res.payload;
        this.count = res.count;

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

    dialogConfig.data = new AgencyDialogData(
      'new',
      {
        id: null,
        name: '',
        description: ''
      },
      0
    );

    const dialogRef = this.dialog.open(AgencyAddComponent, dialogConfig);
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
