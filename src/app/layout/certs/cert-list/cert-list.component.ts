import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../shared/services/user.service';
import { CertDetailComponent } from '../cert-detail/cert-detail.component';
import { CertsService } from '../certs.service';
import { AlertService } from '../../../shared/modules/alert/services/alert.service';

@Component({
  selector: 'app-cert-list',
  templateUrl: './cert-list.component.html',
  styleUrls: ['./cert-list.component.scss']
})
export class CertListComponent implements OnInit {

  admin = false;

  certs = {};
  certsKeys: string[] = [];

  constructor(
    private translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public certsService: CertsService,
    public alertService: AlertService,
    private dialog: MatDialog) {
      this.admin = this.userService.isAdmin();
    }

  ngOnInit() {
    this.list();
  }

  list() {
    this.certsService.list().subscribe(
      res => {
        this.certs = res;
        this.certsKeys = Object.keys(this.certs);
      }
    );
  }

  goDetail(k: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = 480;

    dialogConfig.data = this.certs[k];

    this.dialog.open(CertDetailComponent, dialogConfig);
  }

  delete(k: string) {
    if (confirm('Are you sure to delete the certificate?')) {
      this.certsService.delete(this.certs[k]).subscribe(
        res => {
          if (res) {
            this.list();
          } else {
            this.alertService.create(
              'Delete certificate',
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
