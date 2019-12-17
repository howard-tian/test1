import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceStatus'
})
export class DeviceStatusPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0:
          return 'Offline';
      case 2:
          return 'Idle';
      case 3:
          return 'Playing';
      default:
          return 'Online';
    }
  }

}
