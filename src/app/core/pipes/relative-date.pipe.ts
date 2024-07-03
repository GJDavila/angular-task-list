import { Pipe, PipeTransform } from '@angular/core';
import { isToday, isTomorrow, isYesterday } from 'date-fns';

@Pipe({
  name: 'relativeDate',
  standalone: true
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = new Date(value);

    if (isToday(date)) {
      return 'today';
    }

    if (isTomorrow(date)) {
      return 'tomorrow';
    }

    if (isYesterday(date)) {
      return 'yesterday';
    }

    return date.toDateString();
  }
}
