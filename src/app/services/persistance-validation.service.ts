import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import {processMaxLength, isInvalidValue} from '../models'

interface IValidationsRules {
  [method: string]: (any) => boolean
}

interface IValidationErrors {
  [locale: string]: string[]
}

export type TValidationErrors = Array<{
    locale: string,
    errors: string[]
}>;

const validationRules = {
  required(values, type) {
    
    if (type === false) {
      return true;
    }

    return !Object.keys(values).reduce((result, value) => {
      result = result || isInvalidValue(values[value]);
      return result;
    }, false)
  },
  ['max-length'](values, length) {
    return values.text.length <= length;
  }
}

@Injectable()
export class PersistanceValidationService {

  private validationErrors: IValidationErrors = {}
  
  public showErrors: Subject<boolean> = new Subject();
  public isValid: BehaviorSubject<TValidationErrors> = new BehaviorSubject([{locale: 'dsadasd', errors: []}])
  
  constructor() {}
  
  private isFieldValid(values, validation): boolean {
    return (Object
      .keys(validation)
      .map((rule) => {
        if (!rule) {
          return true;
        }
        return this.validateValuesByRule(rule, validation[rule], values);
      })
      .every(result => !!result))
  }

  private validateValuesByRule(rule, key, values) {
    return validationRules[rule](values, key);
  }

  public valid(values, config): boolean {
    return this.isFieldValid(values, config);
  }

  private notifiValidationResult() {
   this.isValid.next(
      Object
      .keys(this.validationErrors)
      .map(locale => {
        
        if (this.validationErrors[locale] === []) {
          return;
        }

        return {
          locale,
          errors: this.validationErrors[locale]
        }

      }).filter(value => !!value)
    );
  } 

  public check(fieldsById, locale):void {
    this.validationErrors[locale] = Object
      .keys(fieldsById)
      .map(id => fieldsById[id])
      .map(field => { 
        return !this.isFieldValid(field.values, field.config.validation) && field.name
      }).filter(value => !!value);

    this.notifiValidationResult();
  }

  public setShowErrors(is: boolean) {
    this.showErrors.next(is);
  }


  public isFieldNotEmpty(field) {
    return this.validateValuesByRule('required', true, field.values);
  }

}
