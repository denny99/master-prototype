import {Component, Input} from '@angular/core';
import {Converter} from '../../superclass/converter';
import {JsfCore} from '../../superclass/jsf-core';

@Component({
  selector: 'f-convert-number',
  templateUrl: './f-convert-number.component.html',
  styleUrls: ['./f-convert-number.component.css'],
})
export class FConvertNumberComponent extends JsfCore implements Converter {
  @Input()
  pattern: string;
  @Input()
  groupingUsed: boolean;
  @Input()
  locale = 'de-DE';

  constructor() {
    super();
  }

  transformToObject(value: string): any {
    return null;
  }

  transform(value: any): string | null {
    // TODO proper parsing of the decimal java format
    const pattern = this.pattern.split(',');
    return value.toLocaleString(this.locale, {
      minimumFractionDigits: pattern[1].length,
      maximumFractionDigits: pattern[1].length,
      minimumIntegerDigits: pattern[0].length,
      useGrouping: this.groupingUsed,
    });
  }
}
