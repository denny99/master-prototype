import {Injectable} from '@angular/core';

@Injectable()
export class HFormService {
  formId: string;

  validate: () => boolean;

  constructor() {
  }

}
