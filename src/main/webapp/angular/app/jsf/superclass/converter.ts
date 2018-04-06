import {PipeTransform} from '@angular/core';

export interface Converter extends PipeTransform {

  /**
   *
   * @param {string} value
   * @return {object}
   */
  transformToObject(value: string): any;

  transform(value: any, ...args: any[]): string;
}
