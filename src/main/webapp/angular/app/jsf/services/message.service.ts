import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ErrorMessage} from '../objects/error-message';

@Injectable()
export class MessageService {
  private subjects: { [forId: string]: Subject<ErrorMessage>; } = {};
  private observables: { [forId: string]: Observable<ErrorMessage>; } = {};

  constructor() {
  }

  /**
   * h messages subscribe here to listen for new errors
   * @param {string} forId
   * @param {(value: ErrorMessage) => void} [next]
   * @param {(error: any) => void} [error]
   * @returns {Subscription}
   */
  subscribe(
      forId: string, next?: (value: ErrorMessage) => void,
      error?: (error: any) => void) {
    // check if there is an entry for this id
    if (!this.subjects.hasOwnProperty(forId)) {
      this.subjects[forId] = new Subject<ErrorMessage>();
      this.observables[forId] = this.subjects[forId].asObservable();
    }

    return this.observables[forId].subscribe(next, error);
  }

  /**
   * jsf inputs send their validation result here
   * @param {string} id
   * @param {boolean} hasError
   * @param {string} [message]
   */
  submitError(id: string, hasError: boolean, message?: string) {
    // make sure there is an observable for this input
    if (!this.subjects.hasOwnProperty(id)) {
      this.subjects[id] = new Subject<ErrorMessage>();
      this.observables[id] = this.subjects[id].asObservable();
    }

    // now notify the observable about the error message
    this.subjects[id].next(new ErrorMessage(hasError, message));
  }
}
