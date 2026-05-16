import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termText',
  standalone: true,
})
export class TermTextPipe implements PipeTransform {
  transform(text: string, length: number): string {
    return text.split(' ', length).join(' ');
  }
}
