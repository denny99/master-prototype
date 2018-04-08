export default class ValidationResponse {
  /**
   *
   * @param {boolean} error
   * @param {string} message
   * @param {string} elementId
   */
  constructor(
      public error: boolean, public message?: string,
      public elementId?: string) {
  }
}