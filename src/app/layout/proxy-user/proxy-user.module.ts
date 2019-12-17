import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProxyUserRoutingModule } from './proxy-user-routing.module';
import { ProxyUserListComponent } from './proxy-user-list/proxy-user-list.component';

@NgModule({
  declarations: [ProxyUserListComponent],
  imports: [
    TranslateModule,
    CommonModule,
    ProxyUserRoutingModule
  ]
})
export class ProxyUserModule { }
