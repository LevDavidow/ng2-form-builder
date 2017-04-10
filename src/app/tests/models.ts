import { Field, FieldOptions } from '../models';
import { generateUID } from '../helpers';

export interface ITestOptionsOption {
  correct: boolean
  text: string
  uid: string
  touched: boolean
}

interface ITestOptions extends FieldOptions {
  values?: {
    name?: string,
    points?: number,
    desription?: string,
    image?: string,
    allowCustom?: boolean,
    options?: Array<ITestOptionsOption>
  }
}

interface ICounterOptions extends FieldOptions {
  values?: {
    number?: number
  }
}

export class Test extends Field {
  protected defaultValues: Object = {
    name: '',
    description: '',
    points: 1,
    allowCustom: false,
    options: null
  }

  constructor(opts: ITestOptions) {
    super(opts);
    this.defaultValues['options'] = [
        {  
          uid: 'mock1',
          correct: true,
          touched: false,
          text: ''
        },
        {  
          uid: 'mock2',
          correct: false,
          touched: false,
          text: ''
        }
    ]
    super.applyDefaults(this.defaultValues);
  }
}

export class Counter extends Field {
  protected defaultValues: Object = {
    number: 0
  }

  constructor(opts: ICounterOptions) {
    super(opts);
    super.applyDefaults(opts);
  }
}
