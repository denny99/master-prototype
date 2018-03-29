export default class ApiSearchResponse<T> {
  offset: number;
  limit: number;
  max: number;
  data: Array<T>;
}
