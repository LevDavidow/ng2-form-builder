import { Field, FieldOptions } from '../models';

export interface ITestOptionsOption {
  correct: boolean
  text: string
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
    options: [
      {
        сurrent: false,
        text: ''
      },
      {
        current: false,
        text: ''
      }
    ]
  }

  constructor(opts: ITestOptions) {
    super(opts);
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
