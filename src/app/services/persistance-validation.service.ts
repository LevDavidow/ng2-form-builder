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


function isSpecialTestOptionsValid(options) {
  if (!options || options.length < 2) {
    return false
  }

  const selected = options.filter(opt => opt.correct);

  const noSelected = !selected.length;

  if (noSelected) {
    return false;
  }

  if (!selected[0].text) {
    return false;
  }

  let hasTextCounter = 0;

  for (let option of options) {
    if (option.text) {
      hasTextCounter += 1;
    }
  }

  if (hasTextCounter < 2) {
    return false;
  }



  return true;

}

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
  specialTest(values, type) {
     return values.allowCustom === true || isSpecialTestOptionsValid(values.options);
  },
  byKeys(values, configs) {
    return !Object.keys(configs)
      .reduce((result, name) => {

        const rules = 
          Object
            .keys(configs[name])
            .map((rule) => {
              return validationRules[rule]({
                [name]: values[name]
              }, configs[name][rule])
            });

        result = result || rules.filter(isValid => !isValid).length > 0;

        return result;

      } ,false)
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
        return !this.isFieldValid(field.values, field.config.validation) && this.getErrorText(field);
      }).filter(value => !!value);

    this.notifiValidationResult();
  }



  public setShowErrors(is: boolean): void {
    this.showErrors.next(is);
  }


  public isFieldNotEmpty(field): boolean {
    return this.validateValuesByRule('required', true, field.values);
  }

  private getErrorText(field): string {
    return field.values.name ? field.name + ': ' + field.values.name : field.name;
  }

}
