import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertListComponent } from './cert-list/cert-list.component';
import { CertDetailComponent } from './cert-detail/cert-detail.component';

const routes: Routes = [
  { path: '', component: CertListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertsRoutingModule { }
