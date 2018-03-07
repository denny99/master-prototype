export default class ValidationResponse {
  /**
   *
   * @param {boolean} err
   * @param {string} message
   */
  constructor(err, message) {
    this.error = err;
    this.message = message;
  }
}