import {Inject} from '@angular/core'

import { FieldsById, Field as FieldModel, isInvalidValue } from './models';
import { BehaviorSubject } from 'rxjs';

interface IPersistStrategy {
  load(): Promise<string>,
  save(fields: string): void
}

type Field = FieldModel | {
  component: 'string',
  id: string,
  values: Object
}


class InputStrategy implements IPersistStrategy {
  private input: HTMLInputElement;

  constructor(
    inputSelector: string
  ) {
    this.input = (<HTMLInputElement>document.querySelector(inputSelector));
  }

  save(serializedValues: string) {
     this.input.value = serializedValues;
  }

  load(): Promise<string> {
    return Promise.resolve(this.input.value);
  }
}

class HttpStrategy implements IPersistStrategy {

  constructor(
    private endpoint: string,
  ) {
    
  }

  load() {
    return Promise.resolve('');
  }

  save() {

  }
}

class IframeStrategy implements IPersistStrategy {
  private initialState: Promise<any> | string;
  constructor(private inputId) {
    
    if (!window.parent) {
      throw new Error('Iframe persistance requieres parent window');
    }

  }

  private watchMessage() {
    
    window.addEventListener('message', (e) => {
      const payload = e.data;
        
      if (payload.to !== 'NG_FORM' || payload.inputId !== this.inputId) {
        return;
      }
        
    });


  }

  load() {
    return new Promise((resolve) => {

    });
  }

  save() {

  }
}

class MockStrategy implements IPersistStrategy {
  constructor() {
    
  }

  load() {
    return Promise.resolve('');
  }

  save() {

  }
}

export class PersistentFields {  
  private strategy: IPersistStrategy;
  private staticFields: {
    [id: string]: Field
  } = {};
  private fields: Field[];

  constructor(config: any, private validation) {
    
    switch (config.type) {
      case "input":
        this.strategy = new InputStrategy(config.selector)
        break;
      case "iframe":
        this.strategy = new IframeStrategy(config.inputId)
        break;
      case "http": 
        this.strategy = new HttpStrategy(config.endpoint);
        break;
      default:
        console.warn('Using mock persistance strategy')
        this.strategy = new MockStrategy();
        break;
    }

    if (config.endpoint) {
      
    } else if (config.valuesInputSelector && config.orderInputSelector) {
      ;
    }
  }

  private _parse(values: FieldsById, order: string[]):void {
    
    this.fields = (<Field[]>
       this._sanitize(order.map((id: string):Field => values[id]))
    );

    this.staticFields = this._sanitize(
      Object.keys(values)
      .map(name => values[name])
      .filter(field => field.static)
    ).reduce((result, field) => {
      result[field.id] = field;
      return result
    }, {});
  }

  private _sanitize(fields) {
    
    return fields
      .map(field => {
        return {
          id: field.id,
          touched: field.touched,
          component: field.component,
          values: field.values,
        }
      })
      .filter(field => Object
          .keys(field.values)
          .map(key => field.values[key])
          .reduce((result, value) => (result || !isInvalidValue(value)) 
          , false)  
      )
  }

  public save(values: FieldsById, order: string[]): void {    
    this._parse(values, order);

    this.strategy.save(JSON.stringify({
      dynamicFields: this.fields,
      staticFields: this.staticFields
    }));
  }

  
  public load(): Promise<any> {
    return new Promise((resolve) => {
      this.strategy.load().then((fields) => {
        const response = fields && JSON.parse(fields);

        this.staticFields = (response && response.staticFields) || {};

        if (response && response.dynamicFields) {
          this.fields = (<Field[]>response['dynamicFields'])
        } else {
          this.fields = [];
        }

        });

      resolve();
    });
  }

  public getOrder(): string[] {
    return this.fields.map((field) => field.id);
  }

  public getValues(): any {
    const staticFields: any[] = (this.staticFields === {}) ? [] : Object
      .keys(this.staticFields)
      .map(name => this.staticFields[name])
      .map(field => Object.assign({}, field, {
        static: true
      }));
    return [...this.fields, ...staticFields];
  }
}