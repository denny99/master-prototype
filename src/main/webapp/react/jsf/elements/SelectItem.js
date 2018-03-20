/**
 * represents an select option
 */
export default class SelectItem {
  /**
   *
   * @param {string | number | object} value option value
   * @param {string} label option text
   */
  constructor(value, label) {
    this.value = value;
    this.label = label;
  }
}