import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Agency } from '../../agency/agency';
import { AgencyService } from '../../agency/agency.service';
import { Customer } from '../../customer/customer';
import { CustomerService } from '../../customer/customer.service';
import { AlertService } from '../../../shared/modules/alert/services/alert.service';
import { DeviceService } from '../../../shared/services/device.service';

export interface ImportDeviceData {
  type: string;
  data: any;
}

@Component({
  selector: 'app-import-device',
  templateUrl: './import-device.component.html',
  styleUrls: ['./import-device.component.scss']
})
export class ImportDeviceComponent implements OnInit {

  // selectedCustomer: Customer = {
  //   id: 0,
  //   name: '',
  //   description: ''
  // };
  selectedCustomerIndex = 0;
  customers: Customer[] = [

  ];
  excelFile = '';

  constructor(
    private translate: TranslateService,
    public agencyService: AgencyService,
    public deviceService: DeviceService,
    public customerService: CustomerService,
    public alertService: AlertService,
    private dialogRef: MatDialogRef<ImportDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImportDeviceData) { }

  ngOnInit() {
    this.customerService.getPage(1, 1000, 'asc', 'name').subscribe(
      res => {
        this.customers = res.payload;
        if (this.customers && this.customers.length > 0) {

        }
      }
    );
  }

  save() {
    const selectedCustomer = this.customers[this.selectedCustomerIndex];
    console.log(selectedCustomer.id);
    console.log(selectedCustomer.name);
    console.log(selectedCustomer.description);
    console.log(this.excelFile);

    this.customerService.getProxyUser(selectedCustomer.id, 1, 100, 'asc', 'id').subscribe(proxyUser => {
      const formData = new FormData();
      formData.append('file', this.excelFile);
      this.deviceService.Import(proxyUser.id, formData).subscribe(res => {
        this.dialogRef.close(true);
      });
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.excelFile = event.target.files[0];
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
