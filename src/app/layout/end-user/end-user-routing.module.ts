import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndUserListComponent } from './end-user-list/end-user-list.component';

const routes: Routes = [
  { path: '', component: EndUserListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndUserRoutingModule { }
