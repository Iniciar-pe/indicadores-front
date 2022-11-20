import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'nameMonth'
})
export class NameMonth implements PipeTransform {

  transform(value: string): string {
    
    const month = [
        {month: 1, name: 'Ene'},
        {month: 2, name: 'Feb'},
        {month: 3, name: 'Mar'},
        {month: 4, name: 'Abr'},
        {month: 5, name: 'May'},
        {month: 6, name: 'Jun'},
        {month: 7, name: 'Jul'},
        {month: 8, name: 'Ago'},
        {month: 9, name: 'Set'},
        {month: 10, name: 'Oct'},
        {month: 11, name: 'Nov'},
        {month: 12, name: 'Dic'},
    ]

    return month.filter(e => e.month == Number(value))[0]?.name;

  }
}
