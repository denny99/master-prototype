/**
 * represents an select option
 */
export class SelectItem {
  /**
   *
   * @param {string | number | object} value option value
   * @param {string} label option text
   */
  constructor(private value: any, private label: string) {
  }
}