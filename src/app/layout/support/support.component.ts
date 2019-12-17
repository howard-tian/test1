import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../shared/modules/alert/services/alert.service';
import { UserService } from '../../shared/services/user.service';
import { ForceRegisterData, ForceRegisterComponent } from './force-register/force-register.component';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  admin = false;

  constructor(
    private translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public alertService: AlertService,
    private dialog: MatDialog
  ) {
    this.admin = this.userService.isAdmin();
  }

  ngOnInit() {
  }

  forceRegister() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 480;

    dialogConfig.data = {
      email: '',
      password: ''
    } as ForceRegisterData;

    this.dialog.open(ForceRegisterComponent, dialogConfig);
  }
}
