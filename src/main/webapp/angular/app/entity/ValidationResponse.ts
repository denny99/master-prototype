export default class ValidationResponse {
  /**
   *
   * @param {boolean} err
   * @param {string} message
   */
  constructor(public err: boolean, public message: string) {
  }
}