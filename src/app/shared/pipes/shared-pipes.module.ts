import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceStatusPipe } from './device-status.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DeviceStatusPipe
    ],
    exports: [
        DeviceStatusPipe
    ]
})
export class SharedPipesModule { }
