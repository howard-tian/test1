import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { Register } from '../register';
import { SupportComponent } from './support/support.component';
import { ForceRegisterComponent } from './support/force-register/force-register.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, SupportComponent, ForceRegisterComponent],
    providers: [Register],
    entryComponents: [ForceRegisterComponent]
})
export class LayoutModule {}
