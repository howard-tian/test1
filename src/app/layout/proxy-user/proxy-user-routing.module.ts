import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProxyUserListComponent } from './proxy-user-list/proxy-user-list.component';

const routes: Routes = [
  { path: '', component: ProxyUserListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProxyUserRoutingModule { }
