import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiLineBreak'
})
export class MultiLineBreakPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      return value.replace(/\r?\n/g, '<br />');
    }
  }

}
