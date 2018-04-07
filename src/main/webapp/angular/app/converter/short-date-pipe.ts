import {DatePipe} from '@angular/common';
import {Converter} from '../jsf/superclass/converter';

export class ShortDatePipe extends DatePipe implements Converter {
  constructor(locale: string) {
    super(locale);
  }

  transformToObject(value: string): Date {
    return new Date(value);
  }

  transform(
      value: any): string | null {
    return super.transform(value, 'shortDate');
  }
}
