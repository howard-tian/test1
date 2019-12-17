import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../shared/modules/alert/services/alert.service';
import { DeviceService } from '../../../shared/services/device.service';
import { NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {

  myDate: NgbDateStruct;
  myTime: NgbTimeStruct;

  constructor(
    private translate: TranslateService,
    public deviceService: DeviceService,
    public alertService: AlertService,
    private dialogRef: MatDialogRef<DateTimePickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date) {}

  ngOnInit() {
    this.myDate = {
      year: this.data.getFullYear(),
      month: this.data.getMonth(),
      day: this.data.getDate()
    };

    this.myTime = {
      hour: this.data.getHours(),
      minute: this.data.getMinutes(),
      second: this.data.getSeconds()
    }
  }

  ok() {
    const d = new Date(this.myDate.year, this.myDate.month, this.myDate.day, this.myTime.hour, this.myTime.minute, this.myTime.second);
    console.log(d);

    const s = d.toISOString();
    this.dialogRef.close(s.slice(0, s.length - 5));
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
