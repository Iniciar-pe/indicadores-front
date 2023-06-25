import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'nameRatio'
})
export class NameRatio implements PipeTransform {

  transform(value: string, period: string): string {

    const periodArray = [
      {
        id: 1,
        name: 'mes',
      },
      {
        id: 2,
        name: 'trimestre',
      },
      {
        id: 3,
        name: 'semestre',
      },
      {
        id: 4,
        name: 'año',
      },
    ];
    const name = periodArray.filter(e => e.id === Number(period))[0]?.name;
    const nuevaStr = value?.replace(/\%%periodo%%/g, name);
    return nuevaStr;

  }
}
