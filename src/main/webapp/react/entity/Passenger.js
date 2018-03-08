export default class Passenger {
  constructor(json) {
    this.firstName = json ? json.firstName : '';
    this.lastName = json ? json.lastName : '';
    this.idCardNumber = json ? json.idCardNumber : '';
    this.passportNumber = json ? json.passportNumber : '';
    this.birthDay = json ? json.birthDay : '';
    this.luggageCount = json ? json.luggageCount : '';
  }
}