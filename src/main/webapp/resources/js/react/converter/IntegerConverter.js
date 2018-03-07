import Converter from '../jsf/superclass/Converter';

export default class IntegerConverter extends Converter {
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