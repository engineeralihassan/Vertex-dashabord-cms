import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords',
  standalone:true
})
export class TruncateWordsPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (!value) return '';
    const words = value.split(' ');

    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    } else {
      return value; // If word count is less than or equal to limit, return the original string
    }
  }
}
