import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'dateTransformer'
})
export class DateTransformerPipe implements PipeTransform {

  transform(value: any, format: string): any {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, format);
  }

}
