import Converter from '../jsf/superclass/Converter';
import ConverterException from '../exceptions/ConverterException';

export default class IntegerConverter extends Converter {
  getAsObject(value) {
    let int = parseInt(value);
    if (isNaN(int)) {
      throw new ConverterException();
    }
    return int;
  }

  /**
   *
   * @param  {Object} value
   * @returns {string}
   */
  getAsString(value) {
    return value.toString();
  }
}