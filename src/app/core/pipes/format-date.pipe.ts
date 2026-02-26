import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FORMAT_DATE, FORMAT_DATE_TIME } from '@core/constants/format-date-time';

@Pipe({
    name: 'formatDate',
    standalone: false
})
export class FormatDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(value: string | null, ...args: unknown[]): string {
    if (!value) return "";
    return this.datePipe.transform(value, FORMAT_DATE) as string;
  }
}

@Pipe({
    name: 'formatDateWhitHour',
    standalone: false
})
export class FormatDateWithHourPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(value: string | null, ...args: unknown[]): string {
    if (!value) return "";
    return this.datePipe.transform(value, FORMAT_DATE_TIME) as string;
  }
}
