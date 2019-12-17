import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Agency, AgencyDialogData } from '../agency';
import { AgencyService } from '../agency.service';

import { AlertService } from '../../../shared/modules/alert/services/alert.service';

@Component({
  selector: 'app-agency-add',
  templateUrl: './agency-add.component.html',
  styleUrls: ['./agency-add.component.scss']
})
export class AgencyAddComponent implements OnInit {

  title = 'New agency';

  constructor(
    private translate: TranslateService,
    public agencyService: AgencyService,
    public alertService: AlertService,
    private dialogRef: MatDialogRef<AgencyAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgencyDialogData) {
      switch (this.data.command) {
        case 'new':
          this.title = this.translate.instant('New agency');
          break;
        case 'newSub':
          this.title = this.translate.instant('New sub agency');
          break;
        case 'edit':
          this.title = this.translate.instant('Edit agency');
          break;
      }
  }

  ngOnInit() {
  }

  newAgency() {
    this.agencyService.add(this.data.agency.name, this.data.agency.description, null).subscribe(
      res => {
        if (res) {
          this.dialogRef.close(this.data.agency);
        } else {
          this.alertService.create(
            'Create agency',
            'danger',
            10000,
            'Failed!'
          );
        }
      }
    );
  }

  newSubAgency() {
    this.agencyService.add(this.data.agency.name, this.data.agency.description, this.data.agency.id).subscribe(
      res => {
        if (res) {
          this.dialogRef.close(this.data.agency);
        } else {
          this.alertService.create(
            'Create sub agency',
            'danger',
            10000,
            'Failed!'
          );
        }
      }
    );
  }

  editAgency() {
    this.agencyService.edit(this.data.agency, this.data.parent).subscribe(
      res => {
        if (res) {
          this.dialogRef.close(this.data.agency);
        } else {
          this.alertService.create(
            'Edit agency',
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
        this.newAgency();
        break;
      case 'newSub':
          this.newSubAgency();
        break;
      case 'edit':
          this.editAgency();
        break;
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
