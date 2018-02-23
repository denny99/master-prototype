/**
 * represents an select option
 */
export class SelectItem {
  /**
   *
   * @param {string} value option value
   * @param {string} label option text
   */
  constructor(value, label) {
    this.value = value;
    this.label = label;
  }
}