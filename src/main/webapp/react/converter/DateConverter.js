import {Converter} from 'react-jsf/src/index';

export default class DateConverter extends Converter {
  static format = {
    year: 'numeric', month: '2-digit',
    day: '2-digit', hour: '2-digit', minute: '2-digit',
  };

  getAsObject(value) {
    return super.getAsObject(value);
  }

  /**
   *
   * @param  {Object} value
   * @returns {string}
   */
  getAsString(value) {
    return value.toLocaleTimeString('de-DE', DateConverter.format);
  }
}