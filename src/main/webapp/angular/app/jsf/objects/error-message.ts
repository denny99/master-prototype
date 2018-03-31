export class ErrorMessage {
  constructor(public hasError?: boolean, private message?: string) {
  }

  setError(hasError: boolean, message?: string) {
    this.hasError = hasError;
    if (message) {
      this.message = message;
    }
  }
}
