import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namePeriod'
})
export class NamePeriod implements PipeTransform {

  transform(value: string): string {

    const period = [
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

    return period.filter(e => e.id === Number(value))[0]?.name;

  }
}
