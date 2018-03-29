export default class Airport {
  code: string;
  name: string;
  country: string;
  city: string;

  constructor(json) {
    this.code = json.code;
    this.name = json.name;
    this.country = json.country;
    this.city = json.city;
  }
}