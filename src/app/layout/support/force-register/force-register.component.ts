import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { AlertService } from '../../../shared/modules/alert/services/alert.service';
import { UserService } from '../../../shared/services/user.service';

export interface ForceRegisterData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-force-register',
  templateUrl: './force-register.component.html',
  styleUrls: ['./force-register.component.scss']
})
export class ForceRegisterComponent implements OnInit {

  canOk = true;
  email = '';
  password = '';

  constructor(
    private translate: TranslateService,
    public userService: UserService,
    public alertService: AlertService,
    private dialogRef: MatDialogRef<ForceRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ForceRegisterData) { }

  ngOnInit() {

  }

  ok() {
    this.canOk = false;
    this.userService.forceRegister(this.email, this.password).subscribe(
      res => {
        if (res) {
          this.dialogRef.close(res);
        } else {
          this.alertService.create(
            'Force register',
            'danger',
            10000,
            'Failed!'
          );
          this.canOk = true;
        }
      },
      err => {
        this.canOk = true;
      }
    );
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
