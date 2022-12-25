import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'nameRatio'
})
export class NameRatio implements PipeTransform {

  transform(value: string, period: string): string {

    const periodArray = [
      {
        id: 1,
        name: 'Mes',
      },
      {
        id: 2,
        name: 'Trimestre',
      },
      {
        id: 3,
        name: 'Semestre',
      },
      {
        id: 4,
        name: 'Año',
      },
    ];
    const name = periodArray.filter(e => e.id === Number(period))[0]?.name;
    const nuevaStr = value?.replace(/\%%periodo%%/g, name);
    return nuevaStr;

  }
}
