import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
@Pipe({
  name: 'nameMonth'
})
export class NameMonth implements PipeTransform {

  transform(value: Date): string {

    const month = [
      {id: 0, name: 'Ene'},
      {id: 1, name: 'Feb'},
      {id: 2, name: 'Mar'},
      {id: 3, name: 'Abr'},
      {id: 4, name: 'May'},
      {id: 5, name: 'Jun'},
      {id: 6, name: 'Jul'},
      {id: 7, name: 'Ago'},
      {id: 8, name: 'Set'},
      {id: 9, name: 'Oct'},
      {id: 10, name: 'Nov'},
      {id: 11, name: 'Dic'}
    ];

    moment.locale('es');
    if (value) {
      return moment(value).format('D') + ' - ' + month.filter(e => e.id === Number(value?.getMonth()))[0]?.name
      + ' - ' + moment(value).format('YYYY');
    } else { 
      return '';
    }

  }
}
