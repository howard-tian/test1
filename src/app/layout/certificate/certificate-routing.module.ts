import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificateComponent } from './certificate.component';

const routes: Routes = [
    {
        path: '',
        component: CertificateComponent,
        children: [
          { path: '', redirectTo: 'security-list', pathMatch: 'prefix' },
          { path: 'security-list', loadChildren: () => import('./security-list/security-list.module').then(m => m.SecurityListModule) },
          { path: 'details', loadChildren: () => import('./security-details/details.module').then(m => m.DetailsModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CertificateRoutingModule {
}
