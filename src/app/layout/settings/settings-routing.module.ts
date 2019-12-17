import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
          { path: '', redirectTo: 'settings-list', pathMatch: 'prefix' },
          {path: 'settings-list', loadChildren: () => import('./settings-list/settings-list.module').then(m => m.SettingsListModule)},
          {path: 'details', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule)},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsRoutingModule {
}
