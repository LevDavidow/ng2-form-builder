import {FieldComponentName} from './consts';


export function isInvalidValue(value) {
  if (
    value == '' ||
    value == {} ||
    value == []
  ) {
    return true
  }
  return false;
}

export function processMaxLength(prop: string = '', length: number): string {
  return prop.length < length ? prop : prop.slice(0 , length);
}

export abstract class Field {
  public id: string = '';
  public component: FieldComponentName; 
  public values: Object = {};
  public locales: Locales;
  public name: string;
  public config?: IFieldConfig = {};
  public static?: boolean = false;
  public validation: Object = {};
  public touched: boolean = false;

  protected abstract defaultValues: Object;
  constructor(opts: FieldOptions)  {
    
    this.id = opts.id;
    this.name = opts.name;
    this.static = opts.static;
    this.values = opts.values || {}; 
    this.component = opts.component;
    this.config = opts.config || {};

    this.config.locale = this.config.locale || '';
    this.config.validation = this.config.validation || {};
    this.locales = new Locales(opts.locales);
  }

  applyDefaults(values: Object): void {
    this.values = Object.assign(values, this.values);
  }
}

export interface FieldsById {
  [id: string]: any
}

export interface IFieldConfig {
  validation?: Object,
  bottom?: boolean,
  reduce?: Object,
  forceSync?: string[],
  locale?: string,
  ckeditor?: Object,
  elfinder?: Object,
}

export interface FieldOptions {
  id: string,
  static: boolean,
  touched: boolean,
  locales?: ILocales,
  component: FieldComponentName,
  name?: string,
  values?: Object,
  config?: Object
}

export interface ILocales {
  [name: string]: string
}

export class Locales {
  private storage: ILocales = {};
  
  constructor(storage?: ILocales) {
    if(storage) {
      this.storage = storage;
    }
  }
  
  public getItem(value?: string): string {
    return this.storage[value] || value;
  }
}

