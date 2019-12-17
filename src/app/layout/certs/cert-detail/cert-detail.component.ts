import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { CertsService } from '../certs.service';

@Component({
  selector: 'app-cert-detail',
  templateUrl: './cert-detail.component.html',
  styleUrls: ['./cert-detail.component.scss']
})
export class CertDetailComponent implements OnInit {

  cert = {};
  certKeys: string[] = [];

  constructor(
    public certsService: CertsService,
    private translate: TranslateService,
    private dialogRef: MatDialogRef<CertDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    this.certsService.getInfo(this.data).subscribe(res => {
      this.cert = res;
      this.certKeys = Object.keys(this.cert);
    });
  }

  close() {
    this.dialogRef.close(0);
  }
}
