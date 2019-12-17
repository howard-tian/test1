import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
            { path: 'agency', loadChildren: () => import('./agency/agency.module').then(m => m.AgencyModule) },
            { path: 'customers', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
            { path: 'endusers', loadChildren: () => import('./end-user/end-user.module').then(m => m.EndUserModule) },
            { path: 'proxyusers', loadChildren: () => import('./proxy-user/proxy-user.module').then(m => m.ProxyUserModule) },
            { path: 'certs', loadChildren: () => import('./certs/certs.module').then(m => m.CertsModule) },
            { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
            { path: 'info', loadChildren: () => import('./info/info.module').then(m => m.InfoModule) },
            { path: 'device', loadChildren: () => import('./device/device.module').then(m => m.DeviceModule) },
            { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
            { path: 'security', loadChildren: () => import('./certificate/certificate.module').then(m => m.CertificateModule) },
            { path: 'support', component: SupportComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
