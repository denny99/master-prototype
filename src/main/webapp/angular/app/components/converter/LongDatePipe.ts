import {DatePipe} from '@angular/common';

export class LongDatePipe extends DatePipe {
  constructor(locale: string) {
    super(locale);
  }

  transform(
      value: any): string | null {
    return super.transform(value, 'short');
  }
}