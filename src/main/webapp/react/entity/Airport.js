export default class Airport {
  constructor(json) {
    this.code = json.code;
    this.name = json.name;
    this.country = json.country;
    this.city = json.city;
  }
}