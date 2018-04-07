export class Conversation {
  constructor() {
  }

  /**
   * store any value in conversation
   * @param {string} prop
   * @param value
   */
  setProperty(prop: string, value: any): void {
    this[prop] = value;
  }

  /**
   *
   * @param {string} prop
   * @returns {boolean}
   */
  hasProperty(prop: string): boolean {
    return this.hasOwnProperty(prop) && this[prop] !== null;
  }

  /**
   * get a prop from conversation
   * @param {string} prop
   * @returns {any}
   */
  getProperty(prop: string): any {
    if (this.hasOwnProperty(prop)) {
      return this[prop];
    }
    return null;
  }
}