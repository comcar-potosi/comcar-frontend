import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPipe',
    standalone: false
})
export class FilterPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
