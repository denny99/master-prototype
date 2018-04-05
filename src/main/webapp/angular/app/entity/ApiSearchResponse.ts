export default class ApiSearchResponse<T> {
  offset = 0;
  limit = 100;
  maxResults = 10000;
  data: Array<T> = [];

  /**
   *
   * @param {number} [offset]
   * @param {number} [limit]
   * @param {number} [max]
   * @param {object | object[]} [data]
   */
  constructor(offset?: number, limit?: number, max?: number, data?: Array<T>) {
    this.offset = offset === undefined ? 0 : offset;
    this.limit = limit === undefined ? 0 : limit;
    this.maxResults = max === undefined ? 0 : max;
    this.data = data === undefined ? [] : data;
  }
}
