import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(fullName: string): any {
    const name = fullName.split(' ');
    const nameFilter = name.filter(e => !['de', 'con', 'al'].includes(e));
    let returnName = fullName;
    if(name.length > 0) {
      returnName = nameFilter[0] + ' ' + nameFilter[1];
    }
    return returnName
      ?.split(' ')
      .map(n => n[0])
      .join('').toUpperCase();
  }

  private name(params: string) {
    
  }
}
