export default class ValidationResponse {
  error: boolean;
  message: string;

  constructor(error: boolean, message: string) {
    this.error = error;
    this.message = message;
  }
}