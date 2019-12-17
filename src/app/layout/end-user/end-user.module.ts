import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EndUserRoutingModule } from './end-user-routing.module';
import { EndUserListComponent } from './end-user-list/end-user-list.component';

@NgModule({
  declarations: [EndUserListComponent],
  imports: [
    TranslateModule,
    CommonModule,
    EndUserRoutingModule
  ]
})
export class EndUserModule { }
