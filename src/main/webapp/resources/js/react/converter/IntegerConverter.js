import Converter from '../jsf/superclass/Converter';

export default class IntegerConverter extends Converter {
  static format = {
    year: 'numeric', month: '2-digit',
    day: '2-digit', hour: '2-digit', minute: '2-digit',
  };

  getAsObject(value) {
    return parseInt(value);
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