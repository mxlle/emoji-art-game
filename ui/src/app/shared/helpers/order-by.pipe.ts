import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform<T>(array: T[], field: keyof T, asc: boolean = false): T[] {
    array.sort((a: T, b: T) => {
      if (a[field] < b[field]) {
        return asc ? -1 : 1;
      } else if (a[field] > b[field]) {
        return asc ? 1 : -1;
      } else {
        return 0;
      }
    });

    return array;
  }
}
