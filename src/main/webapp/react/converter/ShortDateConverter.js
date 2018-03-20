import Converter from '../jsf/superclass/Converter';
import ConverterException from '../exceptions/ConverterException';

export default class ShortDateConverter extends Converter {
  static format = {
    year: 'numeric', month: '2-digit',
    day: '2-digit',
  };

  getAsObject(value) {
    // only accept dd.MM.yyyy
    // create format yyyy.MM.dd for parsing
    let values = value.split('.').reverse().join('.');
    let date = new Date(values);
    if (date.toString() === 'Invalid Date' ||
        value.match(/\d\d\.\d\d\.\d\d\d\d/).length === 0) {
      throw new ConverterException();
    }
    return date;
  }

  /**
   *
   * @param  {Object} value
   * @return {string}
   */
  getAsString(value) {
    return value.toLocaleDateString('de-DE', ShortDateConverter.format);
  }
}