import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
@Pipe({
  name: 'nameMonth'
})
export class NameMonth implements PipeTransform {

  transform(value: Date): string {

    moment.locale('es');

    return moment(value).format('D MMMM YYYY');

  }
}
