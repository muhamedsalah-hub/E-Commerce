import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sale',
  standalone: true,
})
export class SalePipe implements PipeTransform {
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  transform(value: string): string {
    return `onSale ${value}`;
  }
}
