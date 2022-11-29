import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namePeriod'
})
export class NamePeriod implements PipeTransform {

  transform(value: string): string {

    const period = [
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

    return period.filter(e => e.id === Number(value))[0]?.name;

  }
}
