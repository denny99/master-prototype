import {isInteger} from 'lodash';
import {ConverterException} from '../jsf/exceptions/converter.exception';
import {Converter} from '../jsf/superclass/converter';

export class IntegerPipe implements Converter {
  transformToObject(value: string): number {
    const int = parseInt(value, 10);
    if (!isInteger(int)) {
      throw new ConverterException();
    }
    return int;
  }

  /**
   *
   * @param  {Object} value
   * @returns {string}
   */
  transform(value: number) {
    return value.toString();
  }
}