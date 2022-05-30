import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value: string, local: string = 'fr'): string {
    switch (local) {
      case 'fr': {
        return `+33${value}`;
      }
      case 'en': {
        return `+44${value}`;
      }
      case 'de': {
        return `+49${value}`;
      }
      default: {
        return `+33${value}`;
      }
    }
  }
}
