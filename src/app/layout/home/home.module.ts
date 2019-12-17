import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PageHeaderModule } from '../../shared';
import { ChartsModule as Ng2Charts } from 'ng2-charts';


@NgModule({
    imports: [CommonModule, TranslateModule, Ng2Charts, HomeRoutingModule, PageHeaderModule],
    declarations: [HomeComponent],
    providers: [

    ]
})
export class HomeModule {}
