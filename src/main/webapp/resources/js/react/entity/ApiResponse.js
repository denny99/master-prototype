export class ApiResponse {
  /**
   *
   * @param {number} [offset]
   * @param {number} [limit]
   * @param {number} [max]
   * @param {number} [data]
   */
  constructor(offset, limit, max, data) {
    this.offset = offset === undefined ? 0 : offset;
    this.limit = limit === undefined ? 0 : limit;
    this.max = max === undefined ? 0 : max;
    this.data = data === undefined ? [] : data;
  }
}