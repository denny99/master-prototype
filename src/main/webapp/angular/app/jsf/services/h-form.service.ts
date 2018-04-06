import {Injectable} from '@angular/core';
import {HFormComponent} from '../components/h-form/h-form.component';

@Injectable()
export class HFormService {
  form: HFormComponent;

  validate: () => Promise<boolean>;

  constructor() {
  }

  /**
   * build form id
   * @param {string} [id]
   * @return {string}
   */
  getFormId(id?: string): string {
    // form id set?
    if (this.form && this.form.id) {
      // id given or is the formId itself requested
      if (!id) {
        return this.form.id;
      }
      return `${this.form.id}:${id}`;
    }
    return id;
  }
}
