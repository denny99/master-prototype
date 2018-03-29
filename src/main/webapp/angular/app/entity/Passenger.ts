export default class Passenger {
  firstName: string;
  lastName: string;
  idCardNumber: string;
  passportNumber: string;
  birthDay: Date;
  luggageCount: number;

  constructor(json?) {
    this.firstName = json ? json.firstName : '';
    this.lastName = json ? json.lastName : '';
    this.idCardNumber = json ? json.idCardNumber : '';
    this.passportNumber = json ? json.passportNumber : '';
    this.birthDay = json ?
        new Date(json.birthDay.replace('[UTC]', '')) :
        new Date();
    this.luggageCount = json ? json.luggageCount : 0;
  }
}
