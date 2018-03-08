export default class Aircraft {
  constructor(json) {
    this.id = json.id;
    this.model = json.model;
    this.name = json.name;
    this.passengerCount = json.passengerCount;
  }
}