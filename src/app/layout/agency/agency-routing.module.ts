import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgencyComponent } from './agency.component';
import { AgencyDetailComponent } from './agency-detail/agency-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AgencyComponent
  },
  {
    path: ':id',
    component: AgencyDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
