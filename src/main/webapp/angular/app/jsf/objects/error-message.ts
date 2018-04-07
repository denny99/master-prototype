export class ErrorMessage {
  constructor(public hasError?: boolean, private message?: string) {
  }

  setError(hasError: boolean, message?: string) {
    this.hasError = hasError;
    this.message = message || 'Error in the input field!';
  }
}
