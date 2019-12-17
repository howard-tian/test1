import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { CertListComponent } from './cert-list/cert-list.component';
import { CertDetailComponent } from './cert-detail/cert-detail.component';
import { CertsRoutingModule } from './certs-routing.module';

@NgModule({
  declarations: [CertListComponent, CertDetailComponent],
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CertsRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
    CertDetailComponent
  ]
})
export class CertsModule { }
