export default class ValidationResponse {
  /**
   *
   * @param {boolean} error
   * @param {string} message
   */
  constructor(public error: boolean, public message: string) {
  }
}