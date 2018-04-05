export default class ApiSearchResponse<T> {
  offset = 0;
  limit = 100;
  maxResults = 10000;
  data: Array<T> = [];
}
