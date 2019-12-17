import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './device.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceComponent,
    children: [
      { path: '', redirectTo: 'device-list', pathMatch: 'prefix' },
      { path: 'device-list', loadChildren: () => import('./device-list/device-list.module').then(m => m.DeviceListModule) },
      { path: 'device-details', loadChildren: () => import('./device-details/device-details.module').then(m => m.DeviceDetailsModule) },
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeviceRoutingModule {
}
